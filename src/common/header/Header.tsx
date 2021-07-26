import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import routes from 'routes'
import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Badge,
  Avatar,
  useMediaQuery,
  Collapse,
  Paper,
  Popper,
  Fade,
  Icon,
  Typography,
} from '@material-ui/core'
import { Modal, WalletConnect, Chip } from 'common'
import { closeWarningModal } from 'stores/reducers/wallet'
import { setSearch } from 'stores/reducers/user'
import { selectWallet, selectUser, selectUserRole } from 'stores/selectors'
import SearchField from './SearchField'
import CreateActionMenu from './CreateActionMenu'
import ProfileActionMenu from './ProfileActionMenu'
import NotificationActionMenu from './NotificationActionMenu'
import {
  CurrentDownIcon,
  LogoIcon,
  CoolIcon,
  SmileyFaceIcon,
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
import { HeaderType } from './types'
import { useStyles } from './styles'
import appConst from 'config/consts'
import clsx from 'clsx'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())

  const { role } = useSelector(selectUserRole())
  const isUserSuperAdmin = Boolean(role && role === appConst.USER.ROLES.ROLE_SUPER_ADMIN)

  const bids: Array<string> = []

  const [anchorElCreateLink, setAnchorElCreateLink] = useState<null | HTMLElement>(null)
  const [anchorElProfileLink, setAnchorElProfileLink] = useState<null | HTMLElement>(null)
  const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null)
  const [isSearchFieldOpen, setSearchFieldOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileUserStatsOpen, setIsMobileUserStatsOpen] = useState(false)
  const history = useHistory()

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
      lable: 'My Bids',
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
      onClick: () => console.log('Disconnect'),
    },
  ]

  const combineLinks = isUserSuperAdmin ? [...mainLinks, ...adminLinks] : mainLinks

  const [open, setOpen] = useState<boolean>(false)

  const isMobile = useMediaQuery('(max-width: 680px)')

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

  const handleSearch = (value: string) => {
    dispatch(setSearch(value))
  }

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <LogoIcon className={classes.logo} />
          {isMobile ? (
            <Box className={classes.mobileToolBar}>
              {isSearchFieldOpen ? (
                <SearchField onSearch={handleSearch} isMobile={isMobile} setSearchFieldOpen={setSearchFieldOpen} />
              ) : (
                <>
                  {wallet !== null && (
                    <IconButton className={classes.iconButton} onClick={() => setIsMobileUserStatsOpen(true)}>
                      <SmileyFaceIcon />
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
                value={pathname !== routes.blog ? 0 : 1}
                className={classes.navTabsContainer}
                classes={{ indicator: classes.indicator }}
              >
                {MenuItems.map(({ title, to }) => (
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
                      className={classes.notificationButton}
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
                <ButtonBase onClick={toggleTheme} className={classes.borderedIcon}>
                  <CoolIcon />
                </ButtonBase>
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
        body={<WalletConnect onClose={() => setOpen(false)} />}
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
                    <SmileyFaceIcon />
                  </Icon>
                  <Typography>2.435 ETH</Typography>
                  <IconButton
                    aria-label="notification"
                    // onClick={(event: React.SyntheticEvent<EventTarget>) => {
                    //   const target = event.currentTarget as HTMLElement
                    //   setAnchorElNotification(target)
                    // }}
                    className={clsx(classes.rightBlock, classes.borderedIcon)}
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
                  <IconButton className={classes.borderedIcon} onClick={() => setIsMobileUserStatsOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box className={classes.mobileUserStatsWrapper}>
                  <Typography variant={'h4'}>Bids</Typography>
                  <Box className={classes.bidsCount}>1</Box>
                </Box>
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
