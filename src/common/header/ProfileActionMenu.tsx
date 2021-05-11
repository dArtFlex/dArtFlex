import React from 'react'
import { useHistory } from 'react-router-dom'
import { PopoverLinks } from 'common'
import { ManIcon, ListIcon, BidsIcon, SellIcon, SettingsIcon, DisconnectIcon } from 'common/icons'
import routes from '../../routes'

interface IProfileActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

export default function ProfileActionMenu(props: IProfileActionMenuProps) {
  const { anchor, setAnchor } = props
  const history = useHistory()
  return (
    <PopoverLinks
      anchor={anchor}
      setAnchor={setAnchor}
      links={[
        {
          lable: 'Dashboard',
          icon: <ManIcon />,
          onClick: () => history.push(routes.dashboard),
        },
        {
          lable: 'Trading History',
          icon: <ListIcon />,
          onClick: () => console.log('Trading History'),
        },
        {
          lable: 'Bids',
          icon: <BidsIcon />,
          onClick: () => console.log('Bids'),
        },
        {
          lable: 'Sell',
          icon: <SellIcon />,
          onClick: () => console.log('Sell'),
        },
        {
          lable: 'Account Settings',
          icon: <SettingsIcon />,
          onClick: () => history.push(routes.artworkAccountSettings),
        },
      ]}
      subLinks={[
        {
          lable: 'Disconnect',
          icon: <DisconnectIcon />,
          onClick: () => console.log('Disconnect'),
        },
      ]}
    />
  )
}
