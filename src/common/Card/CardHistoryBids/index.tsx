import React from 'react'
import moment from 'moment'
import { Card, CardHeader, CardContent, Avatar, Typography, Box, Link, Divider, Button } from '@material-ui/core'
import { SuccessIcon } from 'common/icons'
import { CustomTooltip } from 'common'
import { useStyles } from './styles'
import { ICardHistoryBidsProps, ICardContainerProps } from './types'
import { shortCutName } from '../../../utils'
import CircularProgressLoader from '../../Loaders'
import { useSelector } from 'react-redux'
import { selectBid, selectMakeOffer } from '../../../stores/selectors'

export default function CardHistoryBids(props: ICardHistoryBidsProps) {
  const {
    id,
    order_id,
    market_id,
    user_id,
    status,
    updated_at,
    userWalletId,
    bidAmountToToken,
    bidAmountUsd,
    userData,
    onCancel,
    onAcceptBid,
    onAcceptOffer,
    onClaimBid,
    expireDate,
  } = props
  const classes = useStyles()

  const updatedDate = moment(updated_at).format('D MMMM YYYY') + ' at ' + moment(updated_at).format('HH:mm')
  const expFormatDate = moment(expireDate).format('D MMMM YYYY') + ' at ' + moment(expireDate).format('HH:mm')

  const { offer } = useSelector(selectMakeOffer())
  const { bid } = useSelector(selectBid())

  switch (status) {
    case 'offered':
    case 'accepted':
    case 'pending':
    case 'claiming':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                {status === 'offered' ? 'Offer ' : 'Bid '}
                <CustomTooltip text={`${bidAmountToToken} WETH`}>
                  <strong>{`${bidAmountToToken.toFixed(4)}.. WETH`}</strong>
                </CustomTooltip>{' '}
                (${bidAmountUsd}) placed
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        >
          <CardContent classes={{ root: classes.footer }}>
            <Divider />
            <Box className={classes.footerBox}>
              <Typography className={classes.footerText}>Exp. Date: {expFormatDate}</Typography>
              {onCancel && (
                <Button
                  classes={{ root: classes.cardBtn }}
                  disableRipple
                  onClick={() => onCancel({ id: Number(id), order_id, user_id, market_id })}
                >
                  Cancel {status === 'offered' ? 'offer' : 'bid'}
                </Button>
              )}
              {onAcceptBid && (
                <>
                  {bid.transacting ? (
                    <CircularProgressLoader height={'20'} size={20} customWidth={120} />
                  ) : (
                    <Button
                      classes={{ root: classes.cardAcceptBtn }}
                      disableRipple
                      onClick={onAcceptBid}
                      startIcon={<SuccessIcon className={classes.cardAcceptBtnIcon} />}
                    >
                      Accept Bid
                    </Button>
                  )}
                </>
              )}
              {onAcceptOffer && (
                <>
                  {offer.fetching ? (
                    <CircularProgressLoader height={'20'} size={20} customWidth={120} />
                  ) : (
                    <Button
                      classes={{ root: classes.cardAcceptBtn }}
                      disableRipple
                      onClick={onAcceptOffer}
                      startIcon={<SuccessIcon className={classes.cardAcceptBtnIcon} />}
                    >
                      Accept offer
                    </Button>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </CardContainer>
      )
    case 'claiming':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                Bid
                <CustomTooltip text={`${bidAmountToToken} WETH`}>
                  <strong>{`${bidAmountToToken.toFixed(4)}.. WETH`}</strong>
                </CustomTooltip>{' '}
                (${bidAmountUsd}) placed
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        >
          <CardContent classes={{ root: classes.footer }}>
            <Divider />
            <Box className={classes.footerBox}>
              <Typography className={classes.footerText}>Exp. Date: {expFormatDate}</Typography>
              {onClaimBid && (
                <>
                  {bid.transacting ? (
                    <CircularProgressLoader height={'20'} size={20} customWidth={120} />
                  ) : (
                    <Button
                      classes={{ root: classes.cardAcceptBtn }}
                      disableRipple
                      onClick={() => onClaimBid({ id: Number(id), buyerId: user_id })}
                      startIcon={<SuccessIcon className={classes.cardAcceptBtnIcon} />}
                    >
                      Claim Bid
                    </Button>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </CardContainer>
      )
    case 'canceled':
    case 'canceled offer':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                <span className={classes.strike}>
                  Bid{' '}
                  <CustomTooltip text={`${bidAmountToToken} WETH`}>
                    <strong className={classes.strike}>{`${bidAmountToToken.toFixed(4)}.. WETH`}</strong>
                  </CustomTooltip>{' '}
                  (${bidAmountUsd})
                </span>{' '}
                canceled
              </Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
              </Link>
            </Box>
          }
        />
      )
    case 'purchased':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={userData?.profile_image || ''} />}
          action={null}
          title={updatedDate}
          subheader={
            <Box>
              <Typography className={classes.subheader}>Artwork owned</Typography>
              by{' '}
              <Link underline="none" className={classes.linkText}>
                {+user_id === userWalletId ? '@you' : `@${shortCutName(userData?.userid) || ''}`}
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
