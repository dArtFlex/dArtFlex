import React from 'react'
import { useSelector } from 'react-redux'
import { selectMakeOffer } from '../../../../../stores/selectors'
import { useStyles } from '../styles'
import { Box, Typography } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { SuccessfullyIcon } from 'common/icons'

export default function FormApprovedOffer() {
  const classes = useStyles()
  const {
    offer: { fetching },
  } = useSelector(selectMakeOffer())

  return fetching ? (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Authorising your account for this order...
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
      </Box>
    </Box>
  ) : (
    <SubFormTransaction title={'Your offer was submitted successfully'} />
  )
}

interface ISubFormTransaction {
  title: string
  icon?: React.ReactElement | null
}

function SubFormTransaction(props: ISubFormTransaction) {
  const classes = useStyles()
  const { title, icon = <SuccessfullyIcon /> } = props

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            {title}
          </Typography>
        </Box>
        <Box mb={5.5}>{icon}</Box>
      </Box>
    </Box>
  )
}
