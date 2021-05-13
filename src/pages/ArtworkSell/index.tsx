import React, { useState } from 'react'
import DucolLayout from 'layouts/DucolLayout'
import { Box, Typography } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { Form } from 'common'
import { Aside } from './components'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { SetPriceForm, AuctionForm } from './components'

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
  reservePrice: 1,
  startingPrice: 0.01,
  endingPrice: 0.01,
  refferalBounty: 2.5,
  futureTime: '',
  buyerAddress: '',
  startDate: '',
  isEndingPrice: false,
  isFutureTime: false,
  isPrivacy: false,
}

export default function SellArtwork() {
  const classes = useStyles()
  const [form, setForm] = useState(BUY_NOW)

  return (
    <Form data={initialData} onCancel={() => console.log('x')} onSubmit={() => console.log('y')}>
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
  )
}
