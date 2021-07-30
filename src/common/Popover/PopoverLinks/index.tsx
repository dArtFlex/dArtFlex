import React from 'react'
import clsx from 'clsx'
import { Box, Grid, Button, Divider } from '@material-ui/core'
import Popover from '../Popover'
import { IPopoverLinksProps, IButtonLink } from './types'
import { useStyles } from './styles'

export default function PopoverLinks(props: IPopoverLinksProps) {
  const classes = useStyles()
  const { anchor, setAnchor, title = null, subTitle = null, isMobile, links, subLinks } = props

  const ButtonLink = (props: IButtonLink) => {
    const { onClick, lable, icon = null, subLinks, isMobile } = props
    return (
      <Button
        key={lable}
        onClick={onClick}
        variant={'text'}
        disableElevation
        className={clsx(isMobile ? classes.btnTitleMobile : classes.btnTitle, subLinks && classes.btnSubTitle)}
        startIcon={icon}
        classes={{ startIcon: classes.btnIcon }}
      >
        {lable}
      </Button>
    )
  }

  return (
    <>
      {!isMobile ? (
        <Popover anchorEl={anchor} onClose={() => setAnchor!(null)} className={classes.externalLinkMenuWrapper}>
          <Box className={classes.externalLinkMenu}>
            {title}
            <Grid container direction="column">
              {links.map((props, i) => (
                <ButtonLink key={i} {...props} />
              ))}
            </Grid>
            <Divider />
            {subTitle}
            <Grid container direction="column">
              {subLinks?.map((props, i) => (
                <ButtonLink key={i} {...props} subLinks />
              ))}
            </Grid>
          </Box>
        </Popover>
      ) : (
        <>
          <Grid container direction="column" className={classes.mobileButtonWrapper}>
            {links.map((props, i) => (
              <ButtonLink key={i} {...props} isMobile={isMobile} />
            ))}
          </Grid>
          <Divider />
          {subTitle}
          <Grid container direction="column" className={classes.mobileButtonWrapper}>
            {subLinks?.map((props, i) => (
              <ButtonLink key={i} {...props} subLinks isMobile />
            ))}
          </Grid>
        </>
      )}
    </>
  )
}
