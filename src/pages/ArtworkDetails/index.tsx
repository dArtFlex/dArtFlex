import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stateType } from 'stores/reducers'
import { createSelector } from 'reselect'
import { PageWrapper } from 'common'
import { ShareIcon, ExternalLinkIcon, ArrowExpandIcon } from 'common/icons'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab } from '@material-ui/core'
import { useStyles } from './styles'
import clsx from 'clsx'

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

const selectWallet = (id: string) =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets } }: stateType) => ({ asset: assets?.find((a) => a.token_id === id) })
  )

export default function ArtworkDetails() {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { id } = useParams<{ id: string }>()
  const { asset } = useSelector(selectWallet(id))

  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box className={classes.previewContainer}>
          <img src={asset?.image} />
          <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
            <ArrowExpandIcon />
          </IconButton>
        </Box>
        <Box pt={14}>
          <Box className={classes.title}>
            <Typography variant={'h2'}>{asset?.name}</Typography>
            <Box className={classes.titleBtnCotainer}>
              <IconButton className={classes.borderdIconButton}>
                <ShareIcon />
              </IconButton>
              <IconButton className={classes.borderdIconButton}>
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
              <p>{asset?.description}</p>
            </div>
          )}
          {tab === 1 && <p>History</p>}
          {tab === 2 && <p>Info</p>}
        </Box>
      </Box>
    </PageWrapper>
  )
}
