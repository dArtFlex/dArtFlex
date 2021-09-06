import React from 'react'
import { Popover } from 'common'
import clsx from 'clsx'
import { Box, Button, Grid, Divider, Link } from '@material-ui/core'
import {
  TwitterIcon,
  LinkIcon,
  EtherscanIcon,
  OpenseaIcon,
  IpfsIcon,
  EyeIcon,
  ReportIcon,
  ArrowCurveIcon,
  CancelIcon,
} from 'common/icons'
import { useStyles } from './styles'

interface ICTAPopoverProps {
  anchorEl: HTMLElement | null
  onClose: () => void
  twitterLink?: string
  etherscanLink?: string
  IPFSLink?: string
  openseaLink?: string
  creator?: boolean
  superAdmin?: boolean
  onPriceDrop?: () => void
  onCancelListing?: () => void
  onUnbanWork?: () => void
  onReport?: () => void
}

export default function CTAPopover(props: ICTAPopoverProps) {
  const {
    anchorEl,
    onClose,
    creator,
    superAdmin,
    onPriceDrop,
    onCancelListing,
    onUnbanWork,
    onReport,
    twitterLink = '',
    etherscanLink = '',
    IPFSLink = '',
    openseaLink = '',
  } = props
  const classes = useStyles()

  return (
    <Popover anchorEl={anchorEl} onClose={onClose}>
      <Box>
        <Grid container direction="column">
          {creator && (
            <>
              <Button
                onClick={() => onPriceDrop && onPriceDrop()}
                variant={'text'}
                color={'primary'}
                disableElevation
                className={classes.btnTitle}
                startIcon={<ArrowCurveIcon />}
                disabled={!onPriceDrop}
              >
                Price Drop
              </Button>
              <Button
                onClick={() => onCancelListing && onCancelListing()}
                variant={'text'}
                color={'primary'}
                disableElevation
                className={clsx(classes.btnTitle, classes.btnTitleRed)}
                startIcon={<CancelIcon className={classes.linkIconRed} />}
                disabled={!onCancelListing}
              >
                Cancel Listing
              </Button>
              <Divider />
            </>
          )}
          <Button
            variant={'text'}
            color={'primary'}
            disableElevation
            className={classes.btnTitle}
            startIcon={<TwitterIcon className={classes.linkIcon} />}
          >
            <Link underline="none" href={twitterLink} target="_blank" className={classes.shareLink}>
              Share with Twitter
            </Link>
          </Button>
          <Button
            onClick={() => console.log('todo')}
            variant={'text'}
            color={'primary'}
            disableElevation
            className={classes.btnTitle}
            startIcon={<LinkIcon className={classes.linkIcon} />}
          >
            Copy link
          </Button>
          <Divider />
          <Button
            variant={'text'}
            color={'primary'}
            disableElevation
            className={classes.btnTitle}
            startIcon={<EtherscanIcon />}
            disabled={!etherscanLink.length}
          >
            <Link
              underline="none"
              href={etherscanLink}
              target="_blank"
              className={clsx(etherscanLink.length ? classes.shareLink : classes.shareLinkDisable)}
            >
              View on Etherscan
            </Link>
          </Button>
          <Button
            onClick={() => console.log('todo')}
            variant={'text'}
            color={'primary'}
            disableElevation
            className={classes.btnTitle}
            startIcon={<IpfsIcon />}
            disabled={!IPFSLink.length}
          >
            <Link
              underline="none"
              href={IPFSLink}
              target="_blank"
              className={clsx(IPFSLink.length ? classes.shareLink : classes.shareLinkDisable)}
            >
              View on IPFS
            </Link>
          </Button>
          <Button
            onClick={() => console.log('todo')}
            variant={'text'}
            color={'primary'}
            disableElevation
            className={classes.btnTitle}
            startIcon={<OpenseaIcon />}
            disabled={!openseaLink.length}
          >
            <Link
              underline="none"
              href={openseaLink}
              target="_blank"
              className={clsx(openseaLink.length ? classes.shareLink : classes.shareLinkDisable)}
            >
              View on Opensea
            </Link>
          </Button>
          {superAdmin && (
            <>
              <Divider />
              <Button
                onClick={() => onUnbanWork && onUnbanWork()}
                variant={'text'}
                color={'primary'}
                disableElevation
                className={clsx(classes.btnTitle, classes.btnTitleGreen)}
                startIcon={<EyeIcon className={classes.linkIconGreen} />}
                disabled={!onUnbanWork}
              >
                Unban Work
              </Button>
            </>
          )}
          <Divider />
          <Button
            onClick={() => onReport && onReport()}
            variant={'text'}
            color={'primary'}
            disableElevation
            className={clsx(classes.btnTitle, classes.btnTitleRed)}
            startIcon={<ReportIcon className={classes.linkIconRed} />}
            disabled={!onReport}
          >
            Report
          </Button>
        </Grid>
      </Box>
    </Popover>
  )
}
