import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectBuy, selectMakeOffer } from 'stores/selectors'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { Box, Typography, Link, Button } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { ExternalLinkIcon, SuccessfullyIcon } from 'common/icons'
import { useStyles } from '../styles'
import routes from 'routes'
import APP_CONFIG from 'config'

interface IFormApproved {
  onSubmit: () => void
}

export default function FormApproved(props: IFormApproved) {
  const classes = useStyles()
  const { onSubmit } = props

  const {
    buy: { transactionHash, fetchingTransacting, error },
  } = useSelector(selectBuy())

  const {
    offer: { fetching },
  } = useSelector(selectMakeOffer())

  const etherscanViewTx = `${APP_CONFIG.etherscanRinkeby}/tx/${transactionHash}`

  if ((error as string).length) {
    return (
      <SubFormTransaction
        title={`Your transaction wasn't successful`}
        icon={null}
        linkEthescan={etherscanViewTx}
        onSubmit={onSubmit}
      />
    )
  }

  return fetchingTransacting || fetching ? (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Your transaction has started
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            <Box className={classes.warningSubText}>
              <Box mb={4}>
                <Typography className={classes.warningText}>
                  {`The Ethereum network is processing your transaction, which can take a little while. We'll send you an e-mail when it goes through.`}
                </Typography>
              </Box>
              <Typography className={classes.warningText}>
                {`In the meantime check out `}
                <Link href={'#'}>other Artworks on dArtflex</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <SubFormTransaction
      title={`Your transaction succeeded`}
      icon={null}
      linkEthescan={etherscanViewTx}
      onSubmit={onSubmit}
    />
  )
}

interface ISubFormTransaction {
  title: string
  icon?: React.ReactElement | null
  linkEthescan: string
  onSubmit: () => void
}

function SubFormTransaction(props: ISubFormTransaction) {
  const classes = useStyles()
  const { title, icon = <SuccessfullyIcon />, linkEthescan, onSubmit } = props

  const history = useHistory()

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
        {linkEthescan.length ? (
          <Link
            href={linkEthescan}
            underline={'none'}
            target="_blank"
            className={clsx(classes.externalLink, classes.mb)}
          >
            <ExternalLinkIcon />
            <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
          </Link>
        ) : null}
        <Button
          onClick={() => history.push(routes.dashboard)}
          variant={'outlined'}
          color={'secondary'}
          disableElevation
          className={clsx(classes.bitViewBtn)}
        >
          View My Profile
        </Button>
      </Box>
    </Box>
  )
}
