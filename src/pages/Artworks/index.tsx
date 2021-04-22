import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { stateType } from 'stores/reducers'
import { createSelector } from 'reselect'
import { PageWrapper, StyledCheckedMenuItem } from 'common'
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
    ({ assets: { assets } }: stateType) => ({ assets })
  )

export default function Artworks() {
  const classes = useStyles()
  const history = useHistory()
  const { assets } = useSelector(selectAssets())

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
          {assets?.map((a, i) => (
            <Card key={a.token_id} elevation={1}>
              <Box className={classes.artContainer} onClick={() => history.push(`${routes.artworks}/${a.token_id}`)}>
                <img src={a.image} />
              </Box>
              <Box className={classes.artInfoContainer}>
                <Box display={'flex'} mb={4} alignItems={'center'}>
                  <Avatar className={classes.avatar} alt="Avatar" />
                  <Typography variant={'h4'}>@gianapress</Typography>
                </Box>
                <Typography variant={'h4'}>{a.name}</Typography>
              </Box>
              <Box className={classes.cardAction}>
                <Box>
                  <span>Sold for</span>
                  <Typography color={'inherit'} variant={'h3'}>
                    0.1 ETH
                  </Typography>
                </Box>
                {Boolean(i === 1) && (
                  <ButtonBase className={classes.actionBtn}>
                    <TimeIcon className={classes.actionBtnIcon} />
                    00:59:59
                  </ButtonBase>
                )}
                {Boolean(i === 2) && (
                  <ButtonBase className={clsx(classes.actionBtn, classes.actionBtnBurn)}>
                    <BurnIcon className={classes.actionBtnIcon} />
                    00:59:59
                  </ButtonBase>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </PageWrapper>
  )
}
