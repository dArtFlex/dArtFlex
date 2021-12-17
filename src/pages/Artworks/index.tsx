import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { InfiniteLoader, List, AutoSizer, ListRowProps } from 'react-virtualized'
import {
  selectAssets,
  selectWallet,
  selectPromotion,
  selectHashtags,
  selectAssetsMeta,
  selectChain,
  selectAssetsTotal,
} from 'stores/selectors'
import {
  getHashtagsAllRequest,
  loadMoreAssetsRequest,
  getAssetsAllMetaRequest,
  getAssetsAllMetaContextRequest,
} from 'stores/reducers/assets'
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
import { PageWrapper, Select, CardAsset } from 'common'
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
import { getTokenSymbolByContracts } from 'utils'
import { useWindowSize } from 'hooks'

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
  const { assets } = useSelector(selectAssets())
  const { wallet } = useSelector(selectWallet())
  const { promotionAssets, promotionIds } = useSelector(selectPromotion())
  const { hashtags } = useSelector(selectHashtags())
  const { meta } = useSelector(selectAssetsMeta())
  const { chainIds } = useSelector(selectChain())
  const { total } = useSelector(selectAssetsTotal())

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

  const loadMoreAssets = async ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => {
    return dispatch(loadMoreAssetsRequest({ startIndex, stopIndex }))
  }

  const assetsCardRef = useRef<HTMLDivElement>(null)
  const minCardWidth = 322
  const cardHeight = 455
  const gap = 25
  const cardWidth = assetsCardRef?.current?.clientWidth || minCardWidth

  const windowSize = useWindowSize()
  const containerMargin = 80
  const widthContainer = windowSize.width ? windowSize.width - containerMargin : 0
  const assetsPreRow = widthContainer ? Math.round(widthContainer / (cardWidth + gap)) : 1
  // console.log('cardWidth-->>', cardWidth, assetsCardRef)
  // console.log('widthContainer>>>', widthContainer, 'assetsPreRow>>>', assetsPreRow)
  // console.log('fetchingAll__<<', fetchingAll)
  // console.log('total>>>>', total)

  const rowCount = Math.ceil(total / assetsPreRow)
  const rowHeight = cardHeight + gap
  // console.log('rowCount>>>>', rowCount)

  const isAssetsLoaded = ({ index }: { index: number }) => {
    return assets ? !!assets[index * assetsPreRow] : true // index * assetsPreRow - as listener know only about row and each of the row has n assets
  }

  const assetsRenderer = ({ key, index, style }: ListRowProps) => {
    // console.log('index>>', index * assetsPreRow, index * assetsPreRow + assetsPreRow)
    return (
      <div key={key} style={style}>
        <Box className={classes.grid} mt={2}>
          {assets?.slice(index * assetsPreRow, index * assetsPreRow + assetsPreRow).map((asset, i) => (
            <div ref={assetsCardRef} key={key + '' + i}>
              <CardAsset
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
            </div>
          ))}
        </Box>
      </div>
    )
  }

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

        <InfiniteLoader isRowLoaded={isAssetsLoaded} loadMoreRows={loadMoreAssets} rowCount={rowCount} threshold={2}>
          {({ onRowsRendered, registerChild }) => (
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1 1 auto', height: '100vh' }}>
                <AutoSizer>
                  {({ width, height }) => {
                    return (
                      <List
                        ref={registerChild}
                        rowCount={rowCount}
                        rowHeight={rowHeight}
                        rowRenderer={assetsRenderer}
                        onRowsRendered={onRowsRendered}
                        width={width}
                        height={height}
                        overscanRowCount={3}
                      />
                    )
                  }}
                </AutoSizer>
              </div>
            </div>
          )}
        </InfiniteLoader>

        {meta.limit < total && (
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
        )}
      </Box>
    </PageWrapper>
  )
}
