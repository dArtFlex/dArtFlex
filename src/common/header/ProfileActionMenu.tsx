import React from 'react'
import { useHistory } from 'react-router-dom'
import { PopoverLinks } from 'common'
import { ManIcon, ListIcon, BidsIcon, SellIcon, SettingsIcon, DisconnectIcon, ContentIcon } from 'common/icons'
import routes from '../../routes'
interface IProfileActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
  isUserSuperAdmin: boolean
  onDisconnect: () => void
}

export default function ProfileActionMenu(props: IProfileActionMenuProps) {
  const { anchor, setAnchor, isUserSuperAdmin, onDisconnect } = props
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

  const combineLinks = isUserSuperAdmin ? [...mainLinks, ...adminLinks] : mainLinks

  return (
    <PopoverLinks
      anchor={anchor}
      setAnchor={setAnchor}
      links={combineLinks}
      subLinks={[
        {
          lable: 'Disconnect',
          icon: <DisconnectIcon />,
          onClick: onDisconnect,
        },
      ]}
    />
  )
}
