import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMinting } from 'stores/selectors'
import DucolLayout from 'layouts/DucolLayout'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { Form, PageWrapper } from 'common'
import { Aside } from './components'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { SetPriceForm, AuctionForm } from './components'
import { listingRequest } from 'stores/reducers/listing'
import { ISellArtwork } from './types'
import { useValidationSchema } from './lib'
import { history } from '../../navigation'
import routes from '../../routes'

const {
  TYPES: { AUCTION, INSTANT_BY },
} = appConst

const formVariant = [
  {
    value: INSTANT_BY,
    label: 'Set Price',
    desc: 'a fixed or declining price',
  },
  {
    value: AUCTION,
    label: 'Auction',
    desc: 'to the highest bid',
  },
]

const initialData = {
  price: '',
  minimumBid: '',
  reservePrice: '',
  startingPrice: '',
  fee: '2.5',
  futureTime: '',
  expirationTime: '',
  startDate: '',
  endDate: '',
  isEndingPrice: false,
  isFutureTime: false,
}

export default function SellNFT() {
  const classes = useStyles()
  const [form, setForm] = useState(INSTANT_BY)

  const dispatch = useDispatch()
  const { minting } = useSelector(selectMinting())

  if (!minting?.lazyMintData) {
    history.push(routes.createNFT)
  }

  const onSubmit = (values: ISellArtwork) => {
    const type = form === 'instant_buy' ? 'instant_buy' : 'auction'
    dispatch(
      listingRequest({
        data: {
          type,
          startPrice: form === 'instant_buy' ? values.price : values.minimumBid,
          endPrice: values.reservePrice,
          start_time: values.startDate,
          end_time: values.endDate,
          platfromFee: values.fee,
        },
      })
    )
  }

  const isTabletResolution = useMediaQuery('(max-width:1024px)')

  return (
    <PageWrapper className={classes.wrapper}>
      <Form initialValues={initialData} onSubmit={onSubmit} validationSchema={useValidationSchema()}>
        <DucolLayout
          aside={<Aside form={form} />}
          containerSize={'minmax(270px, 554px)'}
          asideSize={'325px'}
          gap={isTabletResolution ? 20 : 135}
        >
          <Box>
            <Typography variant={'h1'} className={classes.formTitle}>
              Sell Artwork
            </Typography>
            <ToggleButtonGroup
              classes={{ root: classes.toggleGroup }}
              exclusive
              onChange={(_, value) => {
                if (value) setForm(value)
              }}
            >
              {formVariant.map(({ label, value, desc }) => {
                return (
                  <ToggleButton
                    classes={{
                      root: classes.toggleBtnRoot,
                      selected: classes.toggleBtnSelected,
                    }}
                    key={value}
                    value={value}
                    selected={form === value}
                  >
                    <Box>
                      <Typography className={classes.toggleBtnLabel}>{label}</Typography>
                      <Typography variant={'body1'} color={'textSecondary'}>
                        {desc}
                      </Typography>
                    </Box>
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup>

            {form === INSTANT_BY ? <SetPriceForm /> : <AuctionForm />}
          </Box>
        </DucolLayout>
      </Form>
    </PageWrapper>
  )
}
