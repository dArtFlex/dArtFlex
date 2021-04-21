import React from 'react'
import { useDispatch } from 'react-redux'
import routes from 'routes'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Tabs, Tab, Box, Button, ButtonBase } from '@material-ui/core'
import { connectMetaMaskRequest } from 'stores/reducers/wallet'
import { getAssetsRequest } from 'stores/reducers/assets'
import { CurrentDownIcon, LogoIcon, CoolIcon } from 'common/icons'
import { HeaderType } from './types'
import { useStyles } from './styles'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

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
          <Button variant={'outlined'} color={'primary'} disableElevation endIcon={<CurrentDownIcon />}>
            Create
          </Button>
          <Button
            onClick={() => {
              dispatch(connectMetaMaskRequest())
            }}
            variant={'contained'}
            color={'primary'}
            disableElevation
          >
            Connect wallet
          </Button>
          <ButtonBase onClick={toggleTheme}>
            <CoolIcon />
          </ButtonBase>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
