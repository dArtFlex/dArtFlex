import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Button } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { SuccessfullyIcon } from 'common/icons'
import { selectBid } from 'stores/selectors'
import { useStyles } from '../styles'
import { ApprovedFormState } from '../../../types'

interface IFormApproved {
  onSubmit: () => void
}

export default function FormApproved(props: IFormApproved) {
  const { onSubmit } = props
  const classes = useStyles()
  const {
    bid: { transacting, error, data },
  } = useSelector(selectBid())

  if (!transacting && data === null && ((error as string).length || typeof error === 'object')) {
    return (
      <SubFormTransaction
        title={'Your bid was unplaced!'}
        desc={`Your bid was unconfirmed on the Ethereum blockchain.`}
        icon={null}
        linkEthescan=""
        onSubmit={onSubmit}
      />
    )
  }

  return transacting ? (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Your bid has been submitted!
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            <Typography
              className={classes.warningText}
            >{`Your bid is being confirmed on the Ethereum blockchain. You are free to leave this page if you like`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <SubFormTransaction
      title={'Your bid was placed successfully!'}
      desc={`Your bid was confirmed on the Ethereum blockchain. Please keep an eye on this auction in case someone outbids you before it's over`}
      linkEthescan=""
      onSubmit={onSubmit}
    />
  )
}

interface ISubFormTransaction {
  title: string
  desc: string
  icon?: React.ReactElement | null
  linkEthescan: string
  onSubmit: () => void
}

function SubFormTransaction(props: ISubFormTransaction) {
  const classes = useStyles()
  const { title, desc, icon = <SuccessfullyIcon />, onSubmit } = props

  const { setFieldValue } = useFormikContext<ApprovedFormState>()

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
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            <Typography className={classes.warningText}>{desc}</Typography>
          </Box>
        </Box>
        <Button
          onClick={() => setFieldValue('formProgress', 'details')}
          variant={'outlined'}
          color={'secondary'}
          disableElevation
          className={clsx(classes.bitViewBtn)}
        >
          View Artwork
        </Button>
      </Box>
    </Box>
  )
}
