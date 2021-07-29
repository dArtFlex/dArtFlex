import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import routes from 'routes'
import { NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import { AppBar, Toolbar, Tabs, Tab, Box, Button, ButtonBase, IconButton, Badge, Avatar } from '@material-ui/core'
import { Modal, WalletConnect, Chip } from 'common'
import { closeWarningModal, walletsDisconetRequest } from 'stores/reducers/wallet'
import { setSearch } from 'stores/reducers/user'
import { selectWallet, selectUser, selectUserRole } from 'stores/selectors'
import SearchField from './SearchField'
import CreateActionMenu from './CreateActionMenu'
import ProfileActionMenu from './ProfileActionMenu'
import NotificationActionMenu from './NotificationActionMenu'
import { CurrentDownIcon, LogoIcon, CoolIcon, SmileyFaceIcon, BellIcon } from 'common/icons'
import { HeaderType, IMenuItems } from './types'
import { useStyles } from './styles'
import appConst from 'config/consts'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())

  const { role } = useSelector(selectUserRole())
  const isUserSuperAdmin = Boolean(role && role === appConst.USER.ROLES.ROLE_SUPER_ADMIN)

  const bids: Array<string> = []

  const [anchorElCreateLink, setAnchorElCreateLink] = useState<null | HTMLElement>(null)
  const [anchorElProfileLink, setAnchorElProfileLink] = useState<null | HTMLElement>(null)
  const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null)

  const [open, setOpen] = useState<boolean>(false)

  const MenuItems: IMenuItems[] = [
    {
      title: 'Artworks',
      to: routes.artworks,
      id: 0,
    },
    // Todo: Would be implemented in next version
    // {
    //   title: 'Blog',
    //   to: routes.blog,
    //   id: 1,
    // },
  ]

  const defaultTabValue =
    MenuItems.find((t) => t.to === path) !== undefined ? MenuItems.find((t) => t.to === path)?.id : -1
  const [tabValue, setTabValue] = React.useState(defaultTabValue)
  const handleChangeTab = (_: React.ChangeEvent<unknown>, newValue: number) => setTabValue(newValue)

  const handleSearch = (value: string) => {
    dispatch(setSearch(value))
  }

  const handleDisconnect = () => {
    dispatch(walletsDisconetRequest())
  }

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <LogoIcon className={classes.logo} />
          <Tabs
            aria-label="navigation"
            value={MenuItems.some((mi) => mi.to === path) ? tabValue : -1}
            onChange={handleChangeTab}
            className={classes.navTabsContainer}
            classes={{ indicator: classes.indicator }}
          >
            {MenuItems.map(({ title, to }, index) => (
              <Tab key={title} label={title} component={NavLink} to={to} className={classes.navTabs} />
            ))}
          </Tabs>
          <Box className={classes.buttonContainer}>
            {Boolean(bids.length) && (
              <Chip avatar={`${bids.length}`} endIcon>
                Bids
              </Chip>
            )}
            <SearchField onSearch={handleSearch} />
            <Button
              onClick={(event: React.SyntheticEvent<EventTarget>) => {
                const target = event.currentTarget as HTMLElement
                setAnchorElCreateLink(target)
              }}
              variant={'outlined'}
              disableElevation
              classes={{ root: classes.createButton }}
              endIcon={<CurrentDownIcon />}
            >
              Create
            </Button>
            {wallet === null ? (
              <Button onClick={() => setOpen(true)} variant={'contained'} color={'primary'} disableElevation>
                Connect wallet
              </Button>
            ) : (
              <>
                <IconButton
                  aria-label="notification"
                  onClick={(event: React.SyntheticEvent<EventTarget>) => {
                    const target = event.currentTarget as HTMLElement
                    setAnchorElNotification(target)
                  }}
                >
                  <Badge
                    color={'primary'}
                    variant="dot"
                    invisible={false}
                    className={classes.notification}
                    classes={{ badge: classes.notificationBadge }}
                  >
                    <BellIcon className={classes.notificationIcon} />
                  </Badge>
                </IconButton>

                <Button
                  onClick={(event: React.SyntheticEvent<EventTarget>) => {
                    const target = event.currentTarget as HTMLElement
                    setAnchorElProfileLink(target)
                  }}
                  className={classes.buttonWallet}
                  variant={'outlined'}
                  color={'primary'}
                  disableElevation
                  startIcon={
                    user?.profile_image ? (
                      <Avatar src={user.profile_image} className={classes.avatar} />
                    ) : (
                      <SmileyFaceIcon />
                    )
                  }
                  endIcon={<CurrentDownIcon />}
                >
                  {`${wallet.balance.toFixed(4)} ${wallet.meta.coinAbbr}`}
                </Button>
              </>
            )}
            <ButtonBase onClick={toggleTheme}>
              <CoolIcon />
            </ButtonBase>
          </Box>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={() => {
          dispatch(closeWarningModal())
          setOpen(false)
        }}
        body={<WalletConnect onClose={() => setOpen(false)} />}
        withAside
      />
      <CreateActionMenu anchor={anchorElCreateLink} setAnchor={setAnchorElCreateLink} />
      <ProfileActionMenu
        anchor={anchorElProfileLink}
        setAnchor={setAnchorElProfileLink}
        isUserSuperAdmin={isUserSuperAdmin}
        onDisconnect={handleDisconnect}
      />
      <NotificationActionMenu anchor={anchorElNotification} setAnchor={setAnchorElNotification} />
    </>
  )
}
