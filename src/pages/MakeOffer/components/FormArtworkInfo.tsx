import React, { useState } from 'react'
import { IMakeOfferForm } from '../types'
import { Box, Button, CardMedia, IconButton, Tab, Tabs, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { MoreHorizontalIcon } from '../../../common/icons'
import clsx from 'clsx'
import Description from './Description'
import History from './History'
import AboutCreator from './AboutCreator'

const tabsItems = [
  {
    title: 'Description',
  },
  {
    title: 'History',
  },
  {
    title: 'About Creator',
  },
]

export default function FormArtworkInfo(props: IMakeOfferForm) {
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  return (
    <Box className={classes.artworkInfoWrapper}>
      <Box className={clsx(classes.flexBox, classes.spaceContent)}>
        <Typography variant={'h2'}>Over Indulgence 2</Typography>
        <IconButton className={clsx(classes.makeOfferBlock, classes.moreIcon)}>
          <MoreHorizontalIcon />
        </IconButton>
      </Box>
      <Box className={classes.gridBox}>
        <Box>
          <Typography variant={'body1'} className={classes.textSecondary}>
            Creator
          </Typography>
          <Box className={clsx(classes.makeOfferBlockContent, classes.flexBox)}>
            <CardMedia
              className={classes.userAvatar}
              image="https://thumbs.dreamstime.com/b/cute-woman-adorable-face-cute-woman-pretty-girl-adorable-face-green-eyes-no-makeup-young-pure-skin-sexy-lips-123011077.jpg"
            />
            <span className={classes.textPrimary}>@giannapress</span>
          </Box>
        </Box>
        <Box>
          <Typography variant={'body1'} className={classes.textSecondary}>
            Owned By
          </Typography>
          <Box className={clsx(classes.makeOfferBlockContent, classes.flexBox)}>
            <CardMedia
              className={classes.userAvatar}
              image="https://1tb.favim.com/preview/4/402/4020/40204/4020462.jpg"
            />
            <span className={classes.textPrimary}>@pieter_p</span>
          </Box>
        </Box>
      </Box>
      <Box className={classes.makeOfferBlock}>
        <Typography variant={'body1'} className={classes.textSecondary}>
          Sold for
        </Typography>
      </Box>
      <Typography variant={'h2'} className={classes.makeOfferBlockContent}>
        0.44 ETH
      </Typography>
      <span className={classes.textPrimary}>$734.58</span>
      <Button
        className={classes.makeOfferBlockContent}
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => props.setFormId(2)}
      >
        Make offer
      </Button>
      <Box mt={10}>
        <Tabs
          aria-label="info"
          value={tab}
          onChange={(_, newValue) => {
            setTab(newValue)
          }}
          indicatorColor="primary"
        >
          {tabsItems.map(({ title }) => (
            <Tab key={title} label={title} classes={{ textColorInherit: classes.tabsTextColor }} />
          ))}
        </Tabs>
        {tab === 0 && <Description />}
        {tab === 1 && <History />}
        {tab === 2 && <AboutCreator />}
      </Box>
    </Box>
  )
}
