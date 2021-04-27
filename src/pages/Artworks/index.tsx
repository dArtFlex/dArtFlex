//@ts-nocheck
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { stateType } from 'stores/reducers'
import { createSelector } from 'reselect'
import { CircularProgressLoader, PageWrapper, StyledCheckedMenuItem } from 'common'
import { CloseIcon, TimeIcon, BurnIcon, RefreshIcon } from 'common/icons'
import {
  Box,
  Typography,
  FormControl,
  Select,
  Button,
  ButtonBase,
  Divider,
  TextField,
  Card,
  Avatar,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import appConst from 'config/consts'
import clsx from 'clsx'
import routes from 'routes'
import { useTimer } from 'hooks'
import { getPriceLable } from 'utils'

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

const selectAssets = () =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets, fetching } }: stateType) => ({ assets, fetching })
  )

export default function Artworks() {
  const classes = useStyles()
  const { assets, fetching } = useSelector(selectAssets())

  const [sortValue, setSortValue] = useState(ENDING_SOON)
  const [filter, setFilter] = useState(LIVE_AUCTION)
  const [showCustomFilters, setShowCustomFilters] = useState(false)
  const [activeHashTags, setActiveHashTags] = useState<string[]>([])

  return (
    <PageWrapper className={classes.wrapper}>
      <Box>
        <Typography variant={'h1'}>Artworks</Typography>
        <Box mt={4} mb={6} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <FormControl variant="outlined" color={'primary'}>
            <Select
              style={{ minWidth: '148px' }}
              value={sortValue}
              onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
                setSortValue(target.value as string)
              }}
            >
              <Typography variant={'body1'} color={'textSecondary'} className={classes.menuTitle}>
                Sort by:
              </Typography>
              {sortItems.map(({ label, value }) => (
                <StyledCheckedMenuItem key={value} value={value}>
                  {label}
                </StyledCheckedMenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            exclusive
            onChange={(_, value) => {
              if (value) setFilter(value)
            }}
          >
            {filterItems.map(({ label, value }) => (
              <ToggleButton key={value} value={value} selected={filter === value}>
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
            <Divider />
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
                      },
                      endAdornment: <Typography className={classes.inputAdorment}>ETH</Typography>,
                    }}
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
              <Button>
                <RefreshIcon className={classes.buttomIcon} />
                Clear Filters
              </Button>
            </Box>
          </Box>
        )}
        <Box className={classes.grid} mt={2}>
          {fetching ? <CircularProgressLoader /> : assets?.map((asset, i) => <AssetCard key={i} asset={asset} />)}
        </Box>
      </Box>
    </PageWrapper>
  )
}

const AssetCard = (props: any) => {
  const { asset } = props
  const classes = useStyles()
  const history = useHistory()
  const { timer } = useTimer(asset._expPeriod)

  return (
    <Card key={asset.tokenId} elevation={1}>
      <Box className={classes.artContainer} onClick={() => history.push(`${routes.artworks}/${asset.tokenId}`)}>
        <img src={asset.image} />
      </Box>
      <Box className={classes.artInfoContainer}>
        <Box display={'flex'} mb={4} alignItems={'center'}>
          <Avatar className={classes.avatar} alt="Avatar" />
          <Typography variant={'h4'}>
            {asset?.owner?.user?.username ? `@${asset.owner.user.username}` : '@you'}
          </Typography>
        </Box>
        <Typography variant={'h4'}>{asset.name}</Typography>
      </Box>
      <Box className={clsx(classes.cardAction, asset._status === 'sold' && classes.cardActionSold)}>
        <Box>
          {asset._status === 'auction' && <span>{asset._currentBit ? 'Current Bid' : 'Reserve Price'}</span>}
          {asset._status === 'buy_now' && <span>Buy Now</span>}
          {asset._status === 'reserve_price' && <span>Reserve Price</span>}
          {asset._status === 'sold' && <span>Sold for</span>}
          <Typography color={'inherit'} variant={'h3'}>
            {asset._status === 'auction' && `${asset._priceReserve || asset._currentBit} ETH`}
            {asset._status === 'buy_now' && `${asset._price} ETH`}
            {asset._status === 'reserve_price' ? (asset._priceReserve ? `${asset._priceReserve} ETH` : '-') : ''}
            {asset._status === 'sold' && `${asset._sold} ETH`}
          </Typography>
        </Box>
        {asset._status === 'auction' && (
          <ButtonBase
            className={clsx(classes.actionBtn, asset._expPeriod < new Date().getTime() && classes.actionBtnBurn)}
          >
            {asset._expPeriod < new Date().getTime() ? (
              <BurnIcon className={classes.actionBtnIcon} />
            ) : (
              <TimeIcon className={classes.actionBtnIcon} />
            )}
            {timer}
          </ButtonBase>
        )}
      </Box>
    </Card>
  )
}
