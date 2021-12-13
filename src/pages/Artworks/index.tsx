import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAssets,
  selectWallet,
  selectPromotion,
  selectHashtags,
  selectAssetsMeta,
  selectChain,
} from 'stores/selectors'
import { getHashtagsAllRequest, getAssetsAllMetaRequest, getAssetsAllMetaContextRequest } from 'stores/reducers/assets'
import { getPromotionRequest } from 'stores/reducers/user'
import clsx from 'clsx'
import {
  Box,
  Typography,
  FormControl,
  Select as MUISelect,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { PageWrapper, Select, CardAsset, CardSkeleton } from 'common'
import { CloseIcon, BurnIcon, RefreshIcon } from 'common/icons'
import Promotions from './components/Promotions'
import {
  useCardStatusLiveAuction,
  useCardStatusBuyNow,
  useCardStatusReserveNotMet,
  useCardStatusSold,
  useCardStatusFeaturedArtworks,
  usePromotionMultiplyData,
} from './lib'
import appConst from 'config/consts'
import { IHashtag, IMetaFilter, MetaFilter, IMetaType, MetaType } from 'types'
import { useStyles } from './styles'
import { creatArrayFromNumber, getTokenSymbolByContracts } from 'utils'

const { INTERVALS } = appConst

const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD },
  ASSETS_PRE_LOAD,
} = appConst

const sortItems = [
  {
    label: 'Ending soon',
    value: MetaFilter.ENDING_SOON,
  },
  {
    label: 'Recently listed',
    value: MetaFilter.RECENT,
  },
  {
    label: 'Price: Low to High',
    value: MetaFilter.PRICE_LOW_HIGH,
  },
  {
    label: 'Price: High to low',
    value: MetaFilter.PRICE_HIGH_LOW,
  },
]

const filterItems = [
  {
    label: 'Live Auction',
    value: MetaType.LIVE_AUCTION,
  },
  {
    label: 'Buy Now',
    value: MetaType.BUY_NOW,
  },
  {
    label: 'Reserve not met',
    value: MetaType.RESERVE_NOT_MET,
  },
  {
    label: 'Sold',
    value: MetaType.SOLD,
  },
  {
    label: 'Featured artworks',
    value: MetaType.FEATURED_ARTWORKS,
  },
]

const ALL_HASHTAG = 'All'
const allHashtag = {
  id: 0,
  name: ALL_HASHTAG,
  title: '',
  created_at: `${new Date()}`,
  updated_at: `${new Date()}`,
}

// const hashTags = ['all', '#General', '#Portraits', '#Landscapes', '#Sci Bio Art', '#Characters']

export default function Artworks() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { assets, fetchingAll } = useSelector(selectAssets())
  const { wallet } = useSelector(selectWallet())
  const { promotionAssets, promotionIds } = useSelector(selectPromotion())
  const { hashtags } = useSelector(selectHashtags())
  const { meta } = useSelector(selectAssetsMeta())
  const { chainIds } = useSelector(selectChain())
  const [sortValue, setSortValue] = useState<IMetaFilter>(MetaFilter.ENDING_SOON)

  const [filter, setFilter] = useState<IMetaType>(meta.type)
  const [prevSearch, setPrevSearch] = useState('')

  const [showCustomFilters, setShowCustomFilters] = useState(false)
  const [activeHashTags, setActiveHashTags] = useState<string[]>([])

  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [hotOnly, setHotOnly] = useState(false)
  const [offset, setOffset] = useState(meta.offset)
  const [limit, setLimit] = useState(meta.limit)

  const promotionMultiply = usePromotionMultiplyData({ promotionIds, promotionAssets })

  const handleSetPrice = (value: string, selector: 'from' | 'to') => {
    if (!value.length) {
      return selector === 'from' ? setPriceFrom('') : setPriceTo('')
    }

    const match = value.match(/^\d+(\.+(\d{1,6})?)?$/m)
    if (match === null) {
      return selector === 'from' ? setPriceFrom(priceFrom) : setPriceTo(priceTo)
    }
    if (match) {
      if (selector === 'from') setPriceFrom(match[0])
      if (selector === 'to') setPriceTo(match[0])
    }
  }

  const handleResetFilter = () => {
    setSortValue(MetaFilter.ENDING_SOON)
    setPriceFrom('')
    setPriceTo('')
    setHotOnly(false)
  }

  const fetchAssets = useCallback(() => {
    let type = filter
    if (prevSearch !== meta.search) {
      type = meta.type
      setPrevSearch(meta.search as string)
      setFilter(meta.type)
    }

    dispatch(
      getAssetsAllMetaRequest({
        type,
        filter: sortValue,
        fromPrice: parseFloat(priceFrom) || 0,
        toPrice: parseFloat(priceTo) || 0,
        hotOnly,
        limit,
        hashtags: activeHashTags,
        offset: meta.offset,
        search: meta.search,
        chainIds,
      })
    )
  }, [filter, sortValue, priceFrom, priceTo, hotOnly, activeHashTags, offset, limit, meta.search, chainIds])

  useEffect(() => {
    fetchAssets()
  }, [filter, sortValue, priceFrom, priceTo, hotOnly, activeHashTags, offset, meta.search, chainIds])

  useEffect(() => {
    fetchAssets()
    dispatch(getHashtagsAllRequest())
    dispatch(getPromotionRequest())
    const iId = setInterval(() => dispatch(getAssetsAllMetaContextRequest()), INTERVALS.UPDATE_ASSETS)
    return () => {
      clearInterval(iId)
    }
  }, [])

  return (
    <PageWrapper className={classes.wrapper}>
      <Box>
        <Typography variant={'h1'}>Artworks</Typography>
        <Promotions artworks={promotionMultiply} />
        <Box className={classes.sortButtons}>
          <Box style={{ minWidth: '180px' }}>
            <FormControl variant="outlined" color={'primary'}>
              <MUISelect
                style={{ minWidth: '148px' }}
                value={sortValue}
                onChange={({
                  target,
                }: React.ChangeEvent<{
                  value: unknown
                }>) => {
                  setSortValue(target.value as IMetaFilter)
                }}
                classes={{ select: classes.sortArtworksMenu }}
                className={classes.sortArtworksMenu}
                MenuProps={{
                  classes: { paper: classes.menuList },
                }}
              >
                <Typography variant={'body1'} color={'textSecondary'} className={classes.menuTitle}>
                  Sort by:
                </Typography>
                {sortItems.map(({ label, value }) => (
                  <Select key={value} value={value} className={classes.sortItem}>
                    {label}
                  </Select>
                ))}
              </MUISelect>
            </FormControl>
          </Box>

          <ToggleButtonGroup
            exclusive
            onChange={(_, value) => {
              if (value) setFilter(value)
              if (value === MetaType.BUY_NOW) {
                setSortValue(MetaFilter.RECENT)
              } else {
                setSortValue(MetaFilter.ENDING_SOON)
              }
            }}
            classes={{ root: classes.sortArtworksMenu }}
          >
            {filterItems.map(({ label, value }) => (
              <ToggleButton
                key={value}
                value={value}
                selected={filter === value}
                classes={{ selected: classes.toggleButtonSelected }}
                className={classes.toggleButton}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button
            onClick={() => setShowCustomFilters(!showCustomFilters)}
            color={showCustomFilters ? 'primary' : 'secondary'}
            variant={'outlined'}
            className={clsx(classes.filtersBtn, showCustomFilters && classes.filtersBtnActive)}
          >
            Filters
            {showCustomFilters && <CloseIcon />}
          </Button>
        </Box>
        {showCustomFilters && (
          <Box mb={7}>
            <Divider className={classes.filterDivider} />
            <Box mt={6} display={'flex'} alignItems={'center'} className={classes.customFiltersContainer}>
              <Box className={classes.hashTagContainer}>
                {hashtags &&
                  [allHashtag, ...hashtags].splice(0, 9).map((ht: IHashtag) => {
                    const isAllActive = Boolean(activeHashTags.length && activeHashTags[0] === ALL_HASHTAG)
                    const isActive = Boolean(activeHashTags.find((h) => h === ht.name))
                    return (
                      <Button
                        key={ht.id}
                        variant={'outlined'}
                        className={clsx(classes.hashTagBtn, isActive && classes.hashTagBtnActive)}
                        onClick={() => {
                          if (ht.name === ALL_HASHTAG) {
                            return isAllActive
                              ? setActiveHashTags([])
                              : setActiveHashTags([ht.name, ...hashtags.map((ht) => ht.name)])
                          }
                          setActiveHashTags(
                            isActive ? activeHashTags.filter((a) => a !== ht.name) : [...activeHashTags, ht.name]
                          )
                        }}
                      >
                        {ht.name}
                      </Button>
                    )
                  })}
              </Box>
              <Typography variant={'body1'} color={'textSecondary'} className={classes.priceTitle}>
                Price
              </Typography>
              {['from', 'to'].map((p, index) => (
                <>
                  <TextField
                    variant={'outlined'}
                    value={p === 'from' ? priceFrom : priceTo}
                    onChange={(e) => handleSetPrice(e.target.value, p as 'from' | 'to')}
                    InputProps={{
                      classes: {
                        input: classes.priceInput,
                        notchedOutline: classes.priceInputBorder,
                      },
                      'aria-valuemin': 0,
                      endAdornment: <Typography className={classes.inputAdorment}>ETH</Typography>,
                    }}
                    type="number"
                    className={classes.priceInput}
                  />
                  {Boolean(index === 0) && (
                    <Box ml={1.5} mr={1.5}>
                      -
                    </Box>
                  )}
                </>
              ))}
              <Box className={classes.hotOnlyBtn}>
                <FormControlLabel
                  control={<Checkbox onChange={(e) => setHotOnly(e.target.checked)} name="burn" color={'primary'} />}
                  label={
                    <Typography className={classes.burnLabel}>
                      <BurnIcon />
                      Hot Only
                    </Typography>
                  }
                />
              </Box>
              <Button onClick={handleResetFilter} startIcon={<RefreshIcon className={classes.buttomIcon} />}>
                Clear Filters
              </Button>
            </Box>
          </Box>
        )}
        <Box className={classes.grid} mt={2}>
          {fetchingAll
            ? creatArrayFromNumber(10).map((e, i) => <CardSkeleton key={i} />)
            : assets?.map((asset, i) => (
                <CardAsset
                  key={i}
                  asset={{
                    ...asset,
                    tokenSymbol: getTokenSymbolByContracts(
                      asset.tokenData?.contract || asset.contract || '',
                      asset.sales_token_contract || ''
                    ),
                  }}
                  userWallet={wallet?.accounts[0]}
                  useCardStatus={
                    filter === LIVE_AUCTION
                      ? useCardStatusLiveAuction
                      : filter === BUY_NOW
                      ? useCardStatusBuyNow
                      : filter === RESERVE_NOT_MET
                      ? useCardStatusReserveNotMet
                      : filter === SOLD
                      ? useCardStatusSold
                      : useCardStatusFeaturedArtworks
                  }
                />
              ))}
        </Box>

        <Box m={3} display={'flex'} justifyContent={'center'}>
          <Button
            onClick={() => {
              setLimit(meta.limit + ASSETS_PRE_LOAD)
              setOffset(offset + 1)
            }}
            variant={'outlined'}
            color={'secondary'}
          >
            Load More
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}
