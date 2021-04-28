//@ts-nocheck
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgressLoader, PageWrapper, StyledCheckedMenuItem, CardAsset } from 'common'
import { CloseIcon, BurnIcon, RefreshIcon } from 'common/icons'
import {
  Box,
  Typography,
  FormControl,
  Select,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useStyles } from './styles'

import appConst from 'config/consts'
import { selectAssets, selectWallet } from 'stores/selectors'
import clsx from 'clsx'

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
            {filterItems.map(({ label, value }) => {
              return wallet !== null ? (
                <ToggleButton key={value} value={value} selected={filter === value}>
                  {label}
                </ToggleButton>
              ) : value === LIVE_AUCTION || value === RESERVE_NOT_MET ? (
                <ToggleButton key={value} value={value} selected={filter === value}>
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
          {fetching ? (
            <CircularProgressLoader />
          ) : (
            assets
              ?.filter((el) => {
                if (filter === FEATURED_ARTWORKS) {
                  return true
                }
                return el._status === filter
              })
              .map((asset, i) => <CardAsset key={i} asset={asset} />)
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}
