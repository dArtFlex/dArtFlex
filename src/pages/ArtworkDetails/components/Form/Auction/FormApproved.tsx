import React from 'react'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Button } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { SuccessfullyIcon } from 'common/icons'
import { selectBid } from 'stores/selectors'
import { useStyles } from '../styles'
import { ApprovedFormState } from '../../../types'

export default function FormApproved() {
  const classes = useStyles()
  const {
    bid: { transacting, error, data },
  } = useSelector(selectBid())

  if ((error as string).length || typeof error === 'object' || (!transacting && data === null)) {
    return (
      <SubFormTransaction
        title={'Your bid was unplaced!'}
        desc={`Your bid was unconfirmed on the Ethereum blockchain.`}
        icon={null}
        linkEthescan=""
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
    />
  )
}

interface ISubFormTransaction {
  title: string
  desc: string
  icon?: React.ReactElement | null
  linkEthescan: string
}

function SubFormTransaction(props: ISubFormTransaction) {
  const classes = useStyles()
  const { title, desc, icon = <SuccessfullyIcon /> } = props

  const { setFieldValue } = useFormikContext<ApprovedFormState>()

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
