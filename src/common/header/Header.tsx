import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import routes from 'routes'
import { useRouteMatch } from 'react-router-dom'
import { NavLink, useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Badge,
  Avatar,
  useMediaQuery,
  Paper,
  Popper,
  Fade,
  Icon,
  Typography,
} from '@material-ui/core'
import { Modal, WalletConnect, Chip } from 'common'
import { closeWarningModal, walletsDisconetRequest } from 'stores/reducers/wallet'
import { setSearch, resetSearch, getActiveBidsByUserRequest } from 'stores/reducers/user'
import { selectWallet, selectUser, selectUserRole, selectNotifications } from 'stores/selectors'
import SearchField from './SearchField'
import CreateActionMenu from './CreateActionMenu'
import ProfileActionMenu from './ProfileActionMenu'
import NotificationActionMenu from './NotificationActionMenu'
import { HeaderType, IMenuItems } from './types'
import {
  CurrentDownIcon,
  LogoIcon,
  CoolIcon,
  BellIcon,
  SearchIcon,
  BurgerMenuIcon,
  CloseIcon,
  ManIcon,
  ListIcon,
  BidsIcon,
  SellIcon,
  SettingsIcon,
  ContentIcon,
  DisconnectIcon,
} from 'common/icons'
import { useStyles } from './styles'
import appConst from 'config/consts'
import image from '../icons/cover_photo.png'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { path } = useRouteMatch()

  const { wallet } = useSelector(selectWallet())
  const { user, activeBids } = useSelector(selectUser())
  const { notifications } = useSelector(selectNotifications())

  const { role } = useSelector(selectUserRole())
  const isUserSuperAdmin = Boolean(role && role === appConst.USER.ROLES.ROLE_SUPER_ADMIN)

  const [anchorElCreateLink, setAnchorElCreateLink] = useState<null | HTMLElement>(null)
  const [anchorElProfileLink, setAnchorElProfileLink] = useState<null | HTMLElement>(null)
  const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null)
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileUserStatsOpen, setIsMobileUserStatsOpen] = useState(false)
  const history = useHistory()

  useEffect(() => {
    user?.id && dispatch(getActiveBidsByUserRequest())
  }, [user?.id])

  const mainLinks = [
    {
      lable: 'Dashboard',
      icon: <ManIcon />,
      onClick: () => history.push(routes.dashboard),
    },
    {
      lable: 'Trading History',
      icon: <ListIcon />,
      onClick: () => history.push(routes.tradingHistory),
    },
    {
      lable: 'My Bids and Offers',
      icon: <BidsIcon />,
      onClick: () => history.push(routes.bids),
    },
    {
      lable: 'My Sales',
      icon: <SellIcon />,
      onClick: () => history.push(routes.sales),
    },
    {
      lable: 'Account Settings',
      icon: <SettingsIcon />,
      onClick: () => history.push(routes.artworkAccountSettings),
    },
  ]

  const adminLinks = [
    {
      lable: 'Management',
      icon: <ContentIcon />,
      onClick: () => history.push(routes.contentManagement),
    },
  ]

  const subLinks = [
    {
      lable: 'Disconnect',
      icon: <DisconnectIcon />,
      onClick: () => {
        setAnchorElProfileLink(null)
        handleDisconnect()
      },
    },
  ]

  const combineLinks = isUserSuperAdmin ? [...mainLinks, ...adminLinks] : mainLinks

  const [open, setOpen] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width: 680px)')
  const showBidsMessage = useMediaQuery('(max-width: 850px)')

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
    MenuItems.find((t) => t.to === path) !== undefined ? MenuItems.find((t) => t.to === path)?.id || 0 : 0
  const [tabValue, setTabValue] = React.useState(defaultTabValue)
  const handleChangeTab = (_: React.ChangeEvent<unknown>, newValue: number) => setTabValue(newValue)

  const handleSearch = (value: string) => {
    dispatch(setSearch(value))
  }

  const handleDisconnect = () => {
    dispatch(walletsDisconetRequest())
  }

  useEffect(() => {
    return () => {
      dispatch(resetSearch())
    }
  }, [])

  return (
    <>
      <AppBar position="static" elevation={0} color={'transparent'}>
        <Box className={classes.banner}>
          <Typography variant="h4">This project is in beta. DYOR</Typography>
        </Box>
        <Toolbar className={classes.toolbar}>
          <LogoIcon className={classes.logo} onClick={() => history.push(routes.artworks)} />
          {isMobile ? (
            <Box className={classes.mobileToolBar}>
              {isSearchFieldOpen ? (
                <SearchField onSearch={handleSearch} isMobile={isMobile} setSearchFieldOpen={setSearchFieldOpen} />
              ) : (
                <>
                  {wallet !== null && (
                    <IconButton className={classes.iconButton} onClick={() => setIsMobileUserStatsOpen(true)}>
                      <Avatar
                        src={user?.profile_image === 'blank' ? image : user?.profile_image}
                        className={classes.avatar}
                      />
                    </IconButton>
                  )}

                  <IconButton className={classes.borderedIcon} onClick={() => setSearchFieldOpen(true)}>
                    <SearchIcon />
                  </IconButton>
                </>
              )}

              <IconButton className={classes.borderedIcon} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <BurgerMenuIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              <Tabs
                aria-label="navigation"
                value={tabValue}
                onChange={handleChangeTab}
                className={classes.navTabsContainer}
                classes={{
                  indicator: MenuItems[tabValue]?.to === path ? classes.indicator : classes.indicatorNonActive,
                }}
              >
                {MenuItems.map(({ title, to }) => (
                  <Tab key={title} label={title} component={NavLink} to={to} className={classes.navTabs} />
                ))}
              </Tabs>
              <Box className={classes.buttonContainer}>
                {Boolean(activeBids.length) && (
                  <Chip avatar={`${activeBids.length}`} endIcon>
                    {showBidsMessage ? '' : 'Bids'}
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
                  {showBidsMessage ? '+' : 'Create'}
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
                      className={classes.notificationButton}
                    >
                      <Badge
                        color={'primary'}
                        variant="dot"
                        invisible={!notifications.length || notifications.every((n) => n.read)}
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
                        <Avatar
                          src={user?.profile_image === 'blank' ? image : user?.profile_image}
                          className={classes.avatar}
                        />
                      }
                      endIcon={<CurrentDownIcon />}
                    >
                      {`${wallet.balance.toFixed(4)} ${wallet.meta.coinAbbr}`}
                    </Button>
                  </>
                )}
                <IconButton onClick={toggleTheme} className={classes.themeIcon}>
                  <CoolIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={() => {
          dispatch(closeWarningModal())
          setOpen(false)
        }}
        body={
          <WalletConnect
            onClose={() => {
              setOpen(false)
              setIsMobileMenuOpen(false)
            }}
          />
        }
        withAside
      />
      {isMobileMenuOpen && (
        <Popper open={isMobileMenuOpen} transition className={classes.mobileMenuWrapper}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={600}>
              <Paper className={classes.mobileMenuContent}>
                <Box className={classes.mobileMenuActionButtons}>
                  <IconButton className={classes.borderedIcon} onClick={toggleTheme}>
                    <CoolIcon />
                  </IconButton>
                  <IconButton className={classes.borderedIcon} onClick={() => setIsMobileMenuOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box className={classes.navTabsBlock}>
                  {MenuItems.map(({ title, to }) => (
                    <Tab key={title} label={title} component={NavLink} to={to} className={classes.navTabsMobile} />
                  ))}
                </Box>
                <Box className={classes.mobileMenuProfileButtons}>
                  <Button
                    onClick={(event: React.SyntheticEvent<EventTarget>) => {
                      const target = event.currentTarget as HTMLElement
                      setAnchorElCreateLink(target)
                    }}
                    variant={'outlined'}
                    disableElevation
                    classes={{ root: classes.createButton }}
                    endIcon={<CurrentDownIcon />}
                    fullWidth
                  >
                    Create
                  </Button>
                  {wallet === null && (
                    <Button
                      onClick={() => setOpen(true)}
                      variant={'contained'}
                      color={'primary'}
                      disableElevation
                      fullWidth
                    >
                      Connect wallet
                    </Button>
                  )}
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      )}

      {isMobileUserStatsOpen && (
        <Popper open={isMobileUserStatsOpen} transition className={classes.mobileMenuWrapper}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={600}>
              <Paper className={classes.mobileMenuUserInfo}>
                <Box className={classes.mobileUserStatsWrapper}>
                  <Icon className={classes.profileIcon}>
                    <Avatar
                      src={user?.profile_image === 'blank' ? image : user?.profile_image}
                      className={classes.avatar}
                    />
                  </Icon>
                  <Typography>{`${wallet?.balance.toFixed(4)} ${wallet?.meta.coinAbbr}`}</Typography>
                  <IconButton
                    aria-label="notification"
                    onClick={(event: React.SyntheticEvent<EventTarget>) => {
                      const target = event.currentTarget as HTMLElement
                      setAnchorElNotification(target)
                    }}
                    className={clsx(classes.rightBlock, classes.borderedIcon)}
                  >
                    <Badge
                      color={'primary'}
                      variant="dot"
                      invisible={!notifications.length || notifications.every((n) => n.read)}
                      className={classes.notification}
                      classes={{ badge: classes.notificationBadge }}
                    >
                      <BellIcon className={classes.notificationIcon} />
                    </Badge>
                  </IconButton>
                  <IconButton className={classes.borderedIcon} onClick={() => setIsMobileUserStatsOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {Boolean(activeBids.length) && (
                  <Box className={classes.mobileUserStatsWrapper}>
                    <Typography variant={'h4'}>Bids</Typography>
                    <Box className={classes.bidsCount}>{activeBids.length}</Box>
                  </Box>
                )}
                <Box className={classes.mobileActionButtonsWrapper}>
                  <Box className={classes.profileTabsWrapper}>
                    <ProfileActionMenu isMobile={isMobile} links={combineLinks} subLinks={subLinks} />
                  </Box>
                </Box>
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
      <CreateActionMenu anchor={anchorElCreateLink} setAnchor={setAnchorElCreateLink} />
      <ProfileActionMenu
        anchor={anchorElProfileLink}
        setAnchor={setAnchorElProfileLink}
        links={combineLinks}
        subLinks={subLinks}
      />
      <NotificationActionMenu anchor={anchorElNotification} setAnchor={setAnchorElNotification} />
    </>
  )
}
