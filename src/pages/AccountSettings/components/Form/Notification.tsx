import React from 'react'
import { Box, Typography, Collapse } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { Field } from 'common'
import { useStyles } from './styles'

export default function Notification() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box className={classes.section}>
      <Box onClick={handleClick} className={classes.collapseHead}>
        <Typography component="h3">Notification Settings</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box className={classes.collapseContainer}>
          <Field type="checkbox" name="notificationSettings.sold" label={'Item Sold'} className={classes.checkbox} />
          <Field
            type="checkbox"
            name="notificationSettings.bidActivity"
            label={'Bid Activity'}
            className={classes.checkbox}
          />
          <Field
            type="checkbox"
            name="notificationSettings.priceChange"
            label={'Price Change'}
            className={classes.checkbox}
          />
          <Field
            type="checkbox"
            name="notificationSettings.auctionExpiration"
            label={'Auction Expiration'}
            className={classes.checkbox}
          />
          <Field type="checkbox" name="notificationSettings.outbid" label={'Outbid'} className={classes.checkbox} />
          <Field
            type="checkbox"
            name="notificationSettings.successfulPurchase"
            label={'Successful Purchase'}
            className={classes.checkbox}
          />
        </Box>
      </Collapse>
    </Box>
  )
}
