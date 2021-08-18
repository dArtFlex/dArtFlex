import React from 'react'
import { useSelector } from 'react-redux'
import { selectMakeOffer } from '../../../../../stores/selectors'
import { useStyles } from '../styles'
import { Box, Link, Typography } from '@material-ui/core'
import { CircularProgressLoader } from '../../../../../common'
import { ExternalLinkIcon, SuccessfullyIcon } from '../../../../../common/icons'
import clsx from 'clsx'

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
    <SubFormTransaction title={'Your offer was submitted successfully'} linkEthescan="" />
  )
}

interface ISubFormTransaction {
  title: string
  icon?: React.ReactElement | null
  linkEthescan: string
}

function SubFormTransaction(props: ISubFormTransaction) {
  const classes = useStyles()
  const { title, icon = <SuccessfullyIcon />, linkEthescan } = props

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            {title}
          </Typography>
        </Box>
        <Box mb={5.5}>{icon}</Box>
        <Link href={linkEthescan} underline={'none'} target="_blank" className={clsx(classes.externalLink, classes.mb)}>
          <ExternalLinkIcon />
          <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
        </Link>
      </Box>
    </Box>
  )
}
