import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMakeOffer } from '../../../../../stores/selectors'
import { useStyles } from '../styles'
import { Box, Button, Typography } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { SuccessfullyIcon } from 'common/icons'
import { clearMakeOfferError } from '../../../../../stores/reducers/makeOffer'

interface IFormApprovedOffer {
  onSubmit: () => void
}

export default function FormApprovedOffer(props: IFormApprovedOffer) {
  const { onSubmit } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    offer: { fetching, error },
  } = useSelector(selectMakeOffer())

  const handleViewArtwork = () => {
    dispatch(clearMakeOfferError())
    onSubmit()
  }

  useEffect(() => {
    return () => {
      dispatch(clearMakeOfferError())
    }
  }, [])

  return fetching ? (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Authorizing your account for this order...
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
      </Box>
    </Box>
  ) : error ? (
    <SubFormTransaction title={'Your offer is been rejected'} onSubmit={onSubmit} icon={null}>
      <Box mt={4}>
        <Button variant={'outlined'} onClick={handleViewArtwork}>
          View artwork{' '}
        </Button>
      </Box>
    </SubFormTransaction>
  ) : (
    <SubFormTransaction title={'Your offer was submitted successfully'} onSubmit={onSubmit} />
  )
}

interface ISubFormTransaction {
  title: string
  icon?: React.ReactElement | null
  onSubmit: () => void
  children?: JSX.Element
}

function SubFormTransaction(props: ISubFormTransaction) {
  const classes = useStyles()
  const { title, icon = <SuccessfullyIcon />, onSubmit, children } = props

  useEffect(() => {
    setTimeout(() => onSubmit(), 5000)
  }, [])

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            {title}
          </Typography>
        </Box>
        <Box mb={5.5}>{icon}</Box>
        {children}
      </Box>
    </Box>
  )
}
