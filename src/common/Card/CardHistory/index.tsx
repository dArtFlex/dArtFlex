import React from 'react'
import moment from 'moment'
import { Card, CardHeader, CardContent, Avatar, IconButton, Typography, Box, Link, Divider } from '@material-ui/core'
import { ExternalLinkIcon } from 'common/icons'
import { CustomTooltip } from 'common'
import { useStyles } from './styles'
import { ICardHistoryProps, ICardContainerProps } from './types'
import APP_CONFIG from 'config'
import { shortCutName } from '../../../utils'
import { useTokenInfo } from 'hooks'

export default function CardHistory(props: ICardHistoryProps) {
  const {
    tx_hash,
    status,
    updated_at,
    userWalletId,
    bidAmountToToken,
    bidAmountUsd,
    userData,
    expireDate,
    sales_token_contract,
  } = props
  const classes = useStyles()

  const updatedDate = moment(updated_at).format('D MMMM YYYY') + ' at ' + moment(updated_at).format('HH:mm')
  const expFormatDate = moment(expireDate).format('D MMMM YYYY') + ' at ' + moment(expireDate).format('HH:mm')
  const etherscanViewTx = `${APP_CONFIG.bscscanTestnet}/tx/${tx_hash}`
  const token = useTokenInfo(sales_token_contract)
  const tokenName = token?.symbol || ''

  switch (status) {
    case 'owend':
    case 'transferred':
    case 'sold':
    case 'minted':
    case 'listed':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={
            tx_hash ? (
              <Link href={etherscanViewTx} target="_blank">
                <IconButton className={classes.borderdIconButton}>
                  <ExternalLinkIcon />
                </IconButton>
              </Link>
            ) : null
          }
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>Artwork {status}</Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {userData.id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        />
      )

    case 'bidded':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={
            tx_hash ? (
              <Link href={etherscanViewTx} target="_blank">
                <IconButton className={classes.borderdIconButton}>
                  <ExternalLinkIcon />
                </IconButton>
              </Link>
            ) : null
          }
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                Bid{' '}
                <CustomTooltip text={`${bidAmountToToken} ${tokenName}`}>
                  <strong>{`${bidAmountToToken.toFixed(4)}.. ${tokenName}`}</strong>
                </CustomTooltip>{' '}
                (${bidAmountUsd}) placed
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {userData.id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        >
          <CardContent classes={{ root: classes.footer }}>
            <Divider />
            <Box className={classes.footerBox}>
              <Typography className={classes.footerText}>Exp. Date: {expFormatDate}</Typography>
            </Box>
          </CardContent>
        </CardContainer>
      )
    case 'canceled':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={
            tx_hash ? (
              <Link href={etherscanViewTx} target="_blank">
                <IconButton className={classes.borderdIconButton}>
                  <ExternalLinkIcon />
                </IconButton>
              </Link>
            ) : null
          }
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                <span className={classes.strike}>
                  Bid{' '}
                  <CustomTooltip text={`${bidAmountToToken} ${tokenName}`}>
                    <strong className={classes.strike}>{`${bidAmountToToken}.. ${tokenName}`}</strong>
                  </CustomTooltip>{' '}
                  (${bidAmountUsd})
                </span>{' '}
                canceled
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {userData.id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        />
      )
    case 'purchased':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={
            tx_hash ? (
              <Link href={etherscanViewTx} target="_blank">
                <IconButton className={classes.borderdIconButton}>
                  <ExternalLinkIcon />
                </IconButton>
              </Link>
            ) : null
          }
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>Artwork owned</Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {userData.id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        />
      )
    default:
      return null
  }
}

const CardContainer = (props: ICardContainerProps) => {
  const { children, ...rest } = props
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        classes={{
          root: classes.header,
          action: classes.action,
          title: classes.title,
          subheader: classes.subheader,
        }}
        {...rest}
      />
      {children}
    </Card>
  )
}
