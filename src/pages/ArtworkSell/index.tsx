import React, { useState } from 'react'
import DucolLayout from 'layouts/DucolLayout'
import { Box, Typography, Divider } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { Form, Field, InputAdornment } from 'common'
import { Aside } from './components'
import appConst from 'config/consts'
import { useStyles } from './styles'

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

const data = {
  price: 0.1,
  endingPrice: false,
}

export default function SellArtwork() {
  const classes = useStyles()
  const [filter, setFilter] = useState(BUY_NOW)

  return (
    <Form data={data} onCancel={() => console.log('x')} onSubmit={() => console.log('y')}>
      <DucolLayout aside={<Aside />} containerSize={'minmax(270px, 554px)'} asideSize={'325px'} gap={135}>
        <Box>
          <Typography variant={'h1'} className={classes.formTitle}>
            Sell Artwork
          </Typography>
          <ToggleButtonGroup classes={{ root: classes.toggleGroup }} exclusive onChange={() => console.log('object')}>
            {formVariant.map(({ label, value, desc }) => {
              return (
                <ToggleButton
                  classes={{
                    root: classes.toggleBtnRoot,
                    selected: classes.toggleBtnSelected,
                  }}
                  key={value}
                  value={value}
                  selected={filter === value}
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
          <Typography className={classes.sectionTitle}>Price</Typography>
          <Box pb={6.5}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Will be on sale until you transfer this item or cancel it.
            </Typography>
          </Box>
          <Field
            type="input"
            name="price"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  icon={
                    <Typography className={classes.mainText} color={'textSecondary'}>
                      ETH
                    </Typography>
                  }
                />
              ),
            }}
          />
          <Divider className={classes.divider} />
          <Box className={classes.flexColumn}>
            <Field type="switch" name="endingPrice" fullWidth={false} className={classes.field} />
            <Typography className={classes.mainText} color={'textPrimary'}>
              Schedule for a future time
            </Typography>
          </Box>
        </Box>
      </DucolLayout>
    </Form>
  )
}
