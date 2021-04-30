import React from 'react'
import clsx from 'clsx'
import { Box, Grid, Button, Divider } from '@material-ui/core'
import Popover from '../Popover'
import { ShareIcon, ExternalLinkIcon, InfoIcon, EtherscanIcon, OpenseaIcon, IpfsIcon, BurnIcon } from 'common/icons'
import { IPopoverLinksProps } from './types'
import { useStyles } from './styles'

export default function PopoverLinks(props: IPopoverLinksProps) {
  const classes = useStyles()
  const { anchor, setAnchor, links, subLinks = [] } = props
  return (
    <Popover anchorEl={anchor} onClose={() => setAnchor(null)}>
      <Box className={classes.externalLinkMenu}>
        <Grid container direction="column">
          {links.map(({ onClick, lable, icon = null }) => (
            <Button
              key={lable}
              onClick={onClick}
              variant={'text'}
              disableElevation
              className={classes.btnTitle}
              startIcon={icon}
            >
              {lable}
            </Button>
          ))}
        </Grid>
        <Divider />
        <Grid container direction="column">
          {subLinks.map(({ onClick, lable, icon = null }) => (
            <Button
              key={lable}
              onClick={onClick}
              variant={'text'}
              disableElevation
              className={clsx(classes.btnTitle, classes.btnSubTitle)}
              startIcon={icon}
            >
              {lable}
            </Button>
          ))}
        </Grid>
      </Box>
    </Popover>
  )
}
