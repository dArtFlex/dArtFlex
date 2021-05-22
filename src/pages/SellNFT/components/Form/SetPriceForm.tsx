import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Divider } from '@material-ui/core'
import { Field, InputAdornment } from 'common'
import { Instructions } from '../../components'
import appConst from 'config/consts'
import { ISellArtwork } from '../../types'
import { useStyles } from './styles'

const {
  SCHEDULE: { DAYS5, DAYS3, WEEK, MONTH, SPECIFIC, NEVER },
} = appConst

const schedule = [
  {
    value: DAYS5,
    label: 'In 5 Days',
  },
  {
    value: DAYS3,
    label: '3 days',
  },
  {
    value: WEEK,
    label: '1 week',
  },
  {
    value: MONTH,
    label: '1 month',
  },
  {
    value: SPECIFIC,
    label: 'Set a specific day',
  },
]
const schedulePlus = [
  ...schedule,
  {
    value: NEVER,
    label: 'Never',
  },
]

export default function SetPriceForm() {
  const classes = useStyles()
  const { values } = useFormikContext<ISellArtwork>()

  return (
    <>
      {values.isEndingPrice ? (
        <>
          <Typography className={classes.sectionTitle}>Starting Price</Typography>
          <Box pb={6.5}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Set an initial price
            </Typography>
          </Box>
          <Field
            type="input"
            name="startingPrice"
            variant="outlined"
            fullWidth={false}
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
        </>
      ) : (
        <>
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
            fullWidth={false}
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
        </>
      )}

      <Divider className={classes.divider} />
      <Box className={classes.flexColumn} pb={4}>
        <Typography className={classes.mainText} color={'textPrimary'}>
          Include ending price
        </Typography>
        <Field type="switch" name="isEndingPrice" fullWidth={false} />
      </Box>
      {values.isEndingPrice ? (
        <>
          <Typography className={classes.mainText} color={'textPrimary'}>
            Ending Price
          </Typography>
          <Box pt={3}>
            <Typography className={classes.mainText} color={'textSecondary'}>
              Must be less than or equal to the starting price. The price will progress linearly to this amount until
              the expiration date.
            </Typography>
          </Box>
          <Box pt={6} className={classes.flexBox}>
            <Field type="input" name="endingPrice" variant={'outlined'} fullWidth={false} />
          </Box>
        </>
      ) : (
        <Typography className={classes.mainText} color={'textSecondary'}>
          Adding an ending price will allow this listing to expire, or for the price to be reduced until a buyer is
          found.
        </Typography>
      )}

      <Divider className={classes.divider} />

      {values.isEndingPrice ? (
        <>
          <Box className={classes.flexColumn} pb={4}>
            <Typography className={classes.mainText} color={'textPrimary'}>
              Expiration Date
            </Typography>
          </Box>
          <Typography className={classes.mainText} color={'textSecondary'}>
            Your listing will automatically end at this time. No need to cancel it!
          </Typography>
          <Box pt={6} className={classes.flexBox}>
            <Field type="select" options={schedulePlus} name="futureTime" fullWidth={false} />
            {values.futureTime === SPECIFIC && <Field type="picker" name="startDate" fullWidth={false} />}
          </Box>
        </>
      ) : (
        <>
          <Box className={classes.flexColumn} pb={4}>
            <Typography className={classes.mainText} color={'textPrimary'}>
              Schedule for a future time
            </Typography>
            <Field type="switch" name="isFutureTime" fullWidth={false} />
          </Box>
          <Typography className={classes.mainText} color={'textSecondary'}>
            You can schedule this listing to only be buyable at a future date
          </Typography>
          {values.isFutureTime && (
            <Box pt={6} className={classes.flexBox}>
              <Field type="select" options={schedule} name="futureTime" fullWidth={false} />
              {values.futureTime === SPECIFIC && <Field type="picker" name="startDate" fullWidth={false} />}
            </Box>
          )}
        </>
      )}

      <Divider className={classes.divider} />
      <Box className={classes.flexColumn} pb={4}>
        <Typography className={classes.mainText} color={'textPrimary'}>
          Privacy
        </Typography>
        <Field type="switch" name="isPrivacy" fullWidth={false} />
      </Box>
      <Box pb={10}>
        <Typography className={classes.mainText} color={'textSecondary'}>
          {`You can keep your listing public, or you can specify one address that's allowed to buy it.`}
        </Typography>
      </Box>
      {values.isPrivacy && (
        <Box pb={15}>
          <Field
            type="input"
            name="buyerAddress"
            label={'Buyer Address'}
            variant={'outlined'}
            placeholder={'Public Key'}
          />
        </Box>
      )}
      <Instructions />
    </>
  )
}
