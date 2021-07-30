import React, { useState } from 'react'
import { PageWrapper } from 'common'
import { Box, Paper, Tab, Tabs, Typography, useMediaQuery } from '@material-ui/core'
import { useStyles } from './styles'
import PromotionManagement from './components/PromotionManagement'
import ContentManagementTab from './components/ContentManagementTab'

export default function ContentManagement() {
  const classes = useStyles()

  const [tab, setTab] = useState(0)

  const tabletMobileVersion = useMediaQuery('(max-width: 961px)')

  console.log(tabletMobileVersion)

  return (
    <PageWrapper className={classes.contentManagementWrapper}>
      <>
        <Typography variant={'h1'}>Management</Typography>

        <Box className={classes.contentWrapper}>
          <Paper classes={{ root: classes.tabWrapperRoot }}>
            <Tabs
              value={tab}
              onChange={(_, newValue) => {
                setTab(newValue)
              }}
              textColor="primary"
              orientation={tabletMobileVersion ? 'horizontal' : 'vertical'}
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabIndicator,
                scroller: classes.tabWrapper,
                flexContainer: classes.flexContainer,
              }}
            >
              <Tab
                label="Promotion Management"
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabButton,
                  textColorPrimary: classes.textColorPrimary,
                }}
              />
              <Tab
                label="Content Management"
                classes={{
                  root: classes.tabRoot,
                  wrapper: classes.tabButton,
                  textColorPrimary: classes.textColorPrimary,
                }}
              />
            </Tabs>
          </Paper>
          {Boolean(tab === 0) && <PromotionManagement />}
          {Boolean(tab === 1) && <ContentManagementTab />}
        </Box>
      </>
    </PageWrapper>
  )
}
