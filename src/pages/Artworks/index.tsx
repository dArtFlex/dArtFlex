import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAssets, selectWallet, selectPromotion } from 'stores/selectors'
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

const hashTags = ['all', '#General', '#Portraits', '#Landscapes', '#Sci Bio Art', '#Characters']

export default function Artworks() {
  const classes = useStyles()
  const { assets, fetching } = useSelector(selectAssets())
  const { wallet } = useSelector(selectWallet())
  const { promotionAssets, promotionIds } = useSelector(selectPromotion())

  const [sortValue, setSortValue] = useState(ENDING_SOON)
  const [filter, setFilter] = useState<IArtworksFiltes>(LIVE_AUCTION)
  const [showCustomFilters, setShowCustomFilters] = useState(false)
  const [activeHashTags, setActiveHashTags] = useState<string[]>([])

  const sortedAssets = useSortedAssets({ assets, filter })

  const promotionMultiply = usePromotionMultiplyData({ promotionIds, promotionAssets })

  return (
    <PageWrapper className={classes.wrapper}>
      <Box>
        <Typography variant={'h1'}>Artworks</Typography>
        <Promotions artworks={promotionMultiply} />
        <Box mt={4} mb={6} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Box style={{ minWidth: '180px' }}>
            <FormControl variant="outlined" color={'primary'}>
              <MUISelect
                style={{ minWidth: '148px' }}
                value={sortValue}
                onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
                  setSortValue(target.value as string)
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
              <Box flex={'1 1 auto'} mr={10}>
                {hashTags.map((ht) => {
                  const isActive = Boolean(activeHashTags.find((h) => h === ht))
                  return (
                    <Button
                      key={ht}
                      variant={'outlined'}
                      className={clsx(classes.hashTagBtn, isActive && classes.hashTagBtnActive)}
                      onClick={() =>
                        setActiveHashTags(isActive ? activeHashTags.filter((a) => a !== ht) : [...activeHashTags, ht])
                      }
                    >
                      {ht}
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
                    InputProps={{
                      classes: {
                        input: classes.priceInput,
                        notchedOutline: classes.priceInputBorder,
                      },
                      endAdornment: <Typography className={classes.inputAdorment}>ETH</Typography>,
                    }}
                    className={classes.priceInput}
                  />
                  {Boolean(index === 0) && (
                    <Box ml={1.5} mr={1.5}>
                      -
                    </Box>
                  )}
                </>
              ))}
              <Box ml={11}>
                <FormControlLabel
                  control={<Checkbox name="burn" color={'primary'} />}
                  label={
                    <Typography className={classes.burnLabel}>
                      <BurnIcon />
                      Hot Only
                    </Typography>
                  }
                />
              </Box>
              <Button startIcon={<RefreshIcon className={classes.buttomIcon} />}>Clear Filters</Button>
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
