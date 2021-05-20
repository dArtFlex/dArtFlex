import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import routes from 'routes'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Tabs, Tab, Box, Button, ButtonBase } from '@material-ui/core'
import { Modal, WalletConnect, Chip, PopoverLinks } from 'common'
import { closeWarningModal } from 'stores/reducers/wallet'
import { selectWallet, selectAuction } from 'stores/selectors'
import SearchField from './SearchField'
import CreateActionMenu from './CreateActionMenu'
import ProfileActionMenu from './ProfileActionMenu'
import { CurrentDownIcon, LogoIcon, CoolIcon, SmileyFaceIcon, BellIcon } from 'common/icons'
import { HeaderType } from './types'
import { useStyles } from './styles'

export default function Header({ toggleTheme }: HeaderType) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { wallet } = useSelector(selectWallet())
  const {
    auction: { bids },
  } = useSelector(selectAuction())

  const [anchorElCreateLink, setAnchorElCreateLink] = useState<null | HTMLElement>(null)
  const [anchorElProfileLink, setAnchorElProfileLink] = useState<null | HTMLElement>(null)

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
              <Tab key={title} label={title} component={NavLink} to={to} className={classes.navTabs} />
            ))}
          </Tabs>
          <Box className={classes.buttonContainer}>
            {Boolean(bids.length) && (
              <Chip avatar={`${bids.length}`} endIcon>
                Bits
              </Chip>
            )}
            <SearchField />
            <Button
              onClick={(event: React.SyntheticEvent<EventTarget>) => {
                const target = event.currentTarget as HTMLElement
                setAnchorElCreateLink(target)
              }}
              variant={'outlined'}
              color={'primary'}
              disableElevation
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
                <Box className={classes.notification}>
                  <BellIcon />
                </Box>

                <Button
                  onClick={(event: React.SyntheticEvent<EventTarget>) => {
                    const target = event.currentTarget as HTMLElement
                    setAnchorElProfileLink(target)
                  }}
                  className={classes.buttonWallet}
                  variant={'outlined'}
                  color={'primary'}
                  disableElevation
                  startIcon={<SmileyFaceIcon />}
                  endIcon={<CurrentDownIcon />}
                >
                  {`${wallet.balance} ${wallet.meta.coinAbbr}`}
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
      <ProfileActionMenu anchor={anchorElProfileLink} setAnchor={setAnchorElProfileLink} />
    </>
  )
}
