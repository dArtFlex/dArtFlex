import React, { useState } from 'react'
import { PageWrapper } from 'common'
import { ShareIcon, ExternalLinkIcon, ArrowExpandIcon } from 'common/icons'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab } from '@material-ui/core'
import { useStyles } from './styles'

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

export default function ArtworksPage() {
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box className={classes.previewContainer}>
          <img src={'/'} />
          <IconButton className={classes.expandBtb}>
            <ArrowExpandIcon />
          </IconButton>
        </Box>
        <Box pt={14}>
          <Box className={classes.title}>
            <Typography variant={'h2'}>Over Indulgence 2</Typography>
            <Box className={classes.titleBtnCotainer}>
              <IconButton>
                <ShareIcon />
              </IconButton>
              <IconButton>
                <ExternalLinkIcon />
              </IconButton>
            </Box>
          </Box>
          <Box className={classes.infoRow} mb={6}>
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Creator
              </Typography>
              <Box>
                <Avatar className={classes.avatar} alt="Avatar" src="/images/avatar/1.jpg" />
                <span>@gianapress</span>
              </Box>
            </Box>
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Owned by
              </Typography>
              <Box>
                <Avatar className={classes.avatar} alt="Avatar" src="/images/avatar/1.jpg" />
                <span>@gianapress</span>
              </Box>
            </Box>
          </Box>
          <Box className={classes.infoRow} mb={6}>
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Current Bid
              </Typography>
              <Typography variant={'h2'}>0.44 ETH</Typography>
              <span>$797.63</span>
            </Box>
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Auction Ending In
              </Typography>
              <Typography variant={'h2'}>0.44 ETH</Typography>
            </Box>
          </Box>
          <Button variant={'contained'} color={'primary'} fullWidth disableElevation className={classes.bitBtn}>
            Place a Bid
          </Button>
          <Tabs
            aria-label="info"
            value={tab}
            onChange={(_, newValue) => {
              setTab(newValue)
            }}
          >
            {tabsItems.map(({ title }) => (
              <Tab key={title} label={title} />
            ))}
          </Tabs>
          {tab === 0 && (
            <div className={classes.tabContant}>
              <p>
                On your way to deliver your shipment, you see this sleeping bird blocking your way. What would you do?
              </p>
              <p>
                However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a
                newspaper or the internet. The are likely to focus on the text, disregarding the layout and its
                elements.
              </p>
              <p>
                Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate
                environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite
                likely since the sixteenth century. -- 1600×1200 px 5 sec at 24 fps
              </p>
            </div>
          )}
          {tab === 1 && <p>History</p>}
          {tab === 2 && <p>Info</p>}
        </Box>
      </Box>
    </PageWrapper>
  )
}
