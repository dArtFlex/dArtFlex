import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import DucolLayout from 'layouts/DucolLayout'
import { Box, Typography } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { Form, PageWrapper } from 'common'
import { Aside } from './components'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { SetPriceForm, AuctionForm } from './components'
import { listingRequest } from 'stores/reducers/listing'
import { ISellArtwork } from './types'

const {
  FILTER_VALUES: { IN_AUCTION, BUY_NOW },
} = appConst

const formVariant = [
  {
    value: BUY_NOW,
    label: 'Set Price',
    desc: 'a fixed or declining price',
  },
  {
    value: IN_AUCTION,
    label: 'Auction',
    desc: 'to the highest bid',
  },
]

const initialData = {
  price: 0.01,
  minimumBid: 0.01,
  reservePrice: '1',
  startingPrice: '0.01',
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
  const [form, setForm] = useState(BUY_NOW)
  const dispatch = useDispatch()

  const onSubmit = (state: ISellArtwork) => {
    const type = form === 'buy_now' ? 'instant_buy' : 'auction'
    dispatch(
      listingRequest({
        data: {
          type,
          startPrice: state.startingPrice,
          endPrice: state.reservePrice,
          startTime: state.startDate,
          endTime: state.endDate,
          platfromFee: state.fee,
        },
      })
    )
  }

  return (
    <PageWrapper className={classes.wrapper}>
      <Form initialValues={initialData} onSubmit={onSubmit}>
        <DucolLayout aside={<Aside form={form} />} containerSize={'minmax(270px, 554px)'} asideSize={'325px'} gap={135}>
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

            {form === BUY_NOW ? <SetPriceForm /> : <AuctionForm />}
          </Box>
        </DucolLayout>
      </Form>
    </PageWrapper>
  )
}
