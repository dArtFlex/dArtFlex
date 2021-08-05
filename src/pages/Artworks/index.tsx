import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAssets, selectWallet, selectPromotion, selectSearch, selectHashtags } from 'stores/selectors'
import { getHashtagsAllRequest } from 'stores/reducers/assets'
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
import { CircularProgressLoader, PageWrapper, Select, CardAsset } from 'common'
import { CloseIcon, BurnIcon, RefreshIcon } from 'common/icons'
import Promotions from './components/Promotions'
import {
  useSearchAssets,
  useInnerAssetsFilter,
  useSortedAssets,
  useCardStatusLiveAuction,
  useCardStatusBuyNow,
  useCardStatusReserveNotMet,
  useCardStatusSold,
  useCardStatusFeaturedArtworks,
  usePromotionMultiplyData,
} from './lib'
import appConst from 'config/consts'
import { IArtworksFiltes } from './types'
import { IHashtag } from 'types'
import { useStyles } from './styles'

const {
  SORT_VALUES: { ENDING_SOON, RECENT, PRICE_LOW_HIGH, PRICE_HIGH_LOW },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, FEATURED_ARTWORKS },
} = appConst

const sortItems = [
  {
    label: 'Ending soon',
    value: ENDING_SOON,
  },
  {
    label: 'Recently listed',
    value: RECENT,
  },
  {
    label: 'Price: Low to High',
    value: PRICE_LOW_HIGH,
  },
  {
    label: 'Price: High to low',
    value: PRICE_HIGH_LOW,
  },
]

const filterItems = [
  {
    label: 'Live Auction',
    value: LIVE_AUCTION,
  },
  {
    label: 'Buy Now',
    value: BUY_NOW,
  },
  {
    label: 'Reserve not met',
    value: RESERVE_NOT_MET,
  },
  {
    label: 'Sold',
    value: SOLD,
  },
  {
    label: 'Featured artworks',
    value: FEATURED_ARTWORKS,
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
  const { assets, fetching } = useSelector(selectAssets())
  const { wallet } = useSelector(selectWallet())
  const { promotionAssets, promotionIds } = useSelector(selectPromotion())
  const { search } = useSelector(selectSearch())
  const { hashtags } = useSelector(selectHashtags())

  const [sortValue, setSortValue] = useState<'ending_soon' | 'recently_listed' | 'price_low_high' | 'price_high_low'>(
    'ending_soon'
  )
  const [filter, setFilter] = useState<IArtworksFiltes>(LIVE_AUCTION)
  const [showCustomFilters, setShowCustomFilters] = useState(false)
  const [activeHashTags, setActiveHashTags] = useState<string[]>([])

  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [hotOnly, setHotOnly] = useState(false)

  const searchAssets = useSearchAssets({ assets, search })
  const innerSearchAssets = useInnerAssetsFilter({
    assets: searchAssets,
    sortBy: sortValue,
    price: { from: priceFrom, to: priceTo },
    hotOnly,
    activeHashTags,
  })
  const sortedAssets = useSortedAssets({ assets: innerSearchAssets, filter })
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
    setSortValue('ending_soon')
    setPriceFrom('')
    setPriceTo('')
    setHotOnly(false)
  }

  useEffect(() => {
    dispatch(getHashtagsAllRequest())
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
                  setSortValue(target.value as 'ending_soon' | 'recently_listed' | 'price_low_high' | 'price_high_low')
                }}
                classes={{ select: classes.sortArtworksMenu }}
                className={classes.sortArtworksMenu}
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
            }}
            classes={{ root: classes.sortArtworksMenu }}
          >
            {filterItems.map(({ label, value }) => {
              return wallet !== null ? (
                <ToggleButton
                  key={value}
                  value={value}
                  selected={filter === value}
                  classes={{ selected: classes.toggleButtonSelected }}
                  className={classes.toggleButton}
                >
                  {label}
                </ToggleButton>
              ) : value === LIVE_AUCTION || value === RESERVE_NOT_MET ? (
                <ToggleButton
                  key={value}
                  value={value}
                  selected={filter === value}
                  classes={{ selected: classes.toggleButtonSelected }}
                >
                  {label}
                </ToggleButton>
              ) : null
            })}
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
          {!assets?.length && fetching ? (
            <CircularProgressLoader />
          ) : (
            sortedAssets?.map((asset, i) => (
              <CardAsset
                key={i}
                asset={asset}
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
            ))
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}
