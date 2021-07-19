import React from 'react'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Link, Button } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { ExternalLinkIcon, SuccessfullyIcon } from 'common/icons'
import { selectBid } from 'stores/selectors'
import { useStyles } from '../styles'
import { ApprovedFormState } from '../../../types'

export default function FormApproved() {
  const classes = useStyles()
  const {
    bid: { transacting, error },
  } = useSelector(selectBid())

  if (error.length) {
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
        <Box mb={5.5} className={classes.externalLink}>
          <ExternalLinkIcon />
          <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
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
  const { title, desc, icon = <SuccessfullyIcon />, linkEthescan } = props

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
        <Box mb={5.5} className={classes.externalLink}>
          <ExternalLinkIcon />
          <Link href={linkEthescan} className={classes.externalLinkText}>{`View on Ethescan`}</Link>
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
