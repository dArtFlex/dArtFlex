import React, { useState } from 'react'
import { PageWrapper } from '../../common'
import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import PromotionManagement from './components/PromotionManagement'

export default function ContentManagement() {
  const classes = useStyles()

  const [tab, setTab] = useState(0)

  return (
    <PageWrapper className={classes.contentManagementWrapper}>
      <>
        <Typography variant={'h1'}>Content Management</Typography>

        <Box display="flex" flexDirection="row" mt={8}>
          <Paper classes={{ root: classes.tabWrapperRoot }}>
            <Tabs
              value={tab}
              onChange={(_, newValue) => {
                setTab(newValue)
              }}
              textColor="primary"
              orientation="vertical"
              classes={{
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
          {Boolean(tab === 1) && <div>Ban</div>}
        </Box>
      </>
    </PageWrapper>
  )
}
