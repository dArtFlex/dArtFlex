import React from 'react'
import { AppBar, Toolbar, Tabs, Tab, Box, Button, ButtonBase } from '@material-ui/core'
import { CurrentDownIcon, LogoIcon, CoolIcon } from 'common/icons'
import { useStyles } from './styles'
import routes from 'routes'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { HeaderType } from './types'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
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
          <Button variant={'contained'} color={'primary'} disableElevation>
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
