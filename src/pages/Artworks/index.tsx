//@ts-nocheck
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgressLoader, PageWrapper, Select, CardAsset } from 'common'
import { CloseIcon, BurnIcon, RefreshIcon } from 'common/icons'
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
import { useStyles } from './styles'

import appConst from 'config/consts'
import { selectAssets, selectWallet } from 'stores/selectors'
import clsx from 'clsx'
import Promotions from './components/Promotions'

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

  const promotionMultiply = [
    {
      id: 1,
      author: {
        id: 1,
        name: 'scheleifer44',
        profilePhoto:
          'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/18/20/istock-847257772.jpg?width=982&height=726&auto=webp&quality=75',
      },
      name: 'Over Indulgence 2',
      bid: 0.44,
      endDate: 1628957487000,
      url:
        'https://live-production.wcms.abc-cdn.net.au/cbe346eee79d3e08dee5e8eb04284438?impolicy=wcms_crop_resize&cropH=1680&cropW=2983&xPos=17&yPos=574&width=862&height=485',
    },
    {
      id: 2,
      author: {
        id: 2,
        name: 'ann1990',
        profilePhoto:
          'https://media.istockphoto.com/photos/portrait-of-young-woman-with-curly-hair-in-the-city-picture-id1218228957?k=6&m=1218228957&s=612x612&w=0&h=Oc5qFk225PFhWuDawxef2BZfcgkqGo-QWU5ZMXPWC7M=',
      },
      name: 'Artwork 2',
      bid: 1.23,
      endDate: 1629130287000,
      url:
        'https://static.media.thinknum.com/media/uploads/blog/.thumbnails/alternativedata_crypto_art_featured.jpg/alternativedata_crypto_art_featured-770x400.jpg',
    },
    {
      id: 3,
      author: {
        id: 3,
        name: 'johnsmith47',
        profilePhoto:
          'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      name: 'Artwork 3',
      bid: 3.21,
      endDate: 1628611887000,
      url: 'https://static.coindesk.com/wp-content/uploads/2021/03/artmosh3-1200x628.jpg',
    },
    {
      id: 4,
      author: {
        id: 4,
        name: 'fisher2918',
        profilePhoto: 'https://images.all-free-download.com/images/graphicthumb/man_singer_musician_214792.jpg',
      },
      name: 'Artwork 4',
      bid: 0.56,
      endDate: 1628611887000,
      url:
        'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/200315897/original/6d796053c884c1964ff7a2cf1253ce71b60c045d/do-crypto-nft-collage-surreal-atheistic-retro-vintage-art.jpg',
    },
    {
      id: 5,
      author: {
        id: 5,
        name: 'marthajunior',
        profilePhoto: 'https://ak.picdn.net/shutterstock/videos/20647573/thumb/1.jpg',
      },
      name: 'Artwork 5',
      bid: 2.43,
      endDate: 1628698287000,
      url:
        'https://1.bp.blogspot.com/-KmIwQYP6jcI/YEOh0Un2VXI/AAAAAAAAJDM/S92sajpugZsNaPGhtLlEXOHg7kps2G4CQCLcBGAsYHQ/w1200-h630-p-k-no-nu/bitcoin-image-nft.jpg',
    },
  ]

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
              >
                <Typography variant={'body1'} color={'textSecondary'} className={classes.menuTitle}>
                  Sort by:
                </Typography>
                {sortItems.map(({ label, value }) => (
                  <Select key={value} value={value}>
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
          {!assets?.length && fetching ? (
            <CircularProgressLoader />
          ) : (
            assets
              ?.filter((el) => {
                if (filter === FEATURED_ARTWORKS) {
                  return true
                }
                return el.type === filter
              })
              .map((asset, i) => <CardAsset key={i} asset={asset} />)
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}
