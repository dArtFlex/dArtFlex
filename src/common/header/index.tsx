import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { stateType } from 'stores/reducers'
import { createSelector } from 'reselect'
import routes from 'routes'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Tabs, Tab, Box, Button, ButtonBase } from '@material-ui/core'

import { Modal, WalletConnect } from 'common'
import SearchField from './SearchField'
import { CurrentDownIcon, LogoIcon, CoolIcon, SmileyFaceIcon } from 'common/icons'
import { HeaderType } from './types'
import { useStyles } from './styles'

const selectWallet = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { wallet } }: stateType) => ({ wallet })
  )

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const { pathname } = useLocation()
  const { wallet } = useSelector(selectWallet())

  const [open, setOpen] = useState<boolean>(false)

  const MenuItems = [
    {
      title: 'Artworks',
      to: routes.artworks,
    },
    {
      title: 'Blog',
      to: routes.blog,
    },
  ]

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <LogoIcon className={classes.logo} />
          <Tabs aria-label="navigation" value={pathname !== routes.blog ? 0 : 1} className={classes.navTabsContainer}>
            {MenuItems.map(({ title, to }) => (
              //@ts-ignore: unreachable error
              <Tab key={title} label={title} component={NavLink} to={to} className={classes.navTabs} />
            ))}
          </Tabs>
          <Box className={classes.buttonContainer}>
            <SearchField />
            <Button variant={'outlined'} color={'primary'} disableElevation endIcon={<CurrentDownIcon />}>
              Create
            </Button>
            {wallet === null ? (
              <Button onClick={() => setOpen(true)} variant={'contained'} color={'primary'} disableElevation>
                Connect wallet
              </Button>
            ) : (
              <Button
                className={classes.buttonWallet}
                variant={'outlined'}
                color={'primary'}
                disableElevation
                startIcon={<SmileyFaceIcon />}
                endIcon={<CurrentDownIcon />}
              >
                {`${wallet.balance} ${wallet.meta.coinAbbr}`}
              </Button>
            )}
            <ButtonBase onClick={toggleTheme}>
              <CoolIcon />
            </ButtonBase>
          </Box>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        body={<WalletConnect onClose={() => setOpen(false)} />}
        withAside
      />
    </>
  )
}
