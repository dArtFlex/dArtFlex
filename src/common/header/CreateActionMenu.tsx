import React from 'react'
import { useHistory } from 'react-router-dom'
import { PopoverLinks } from 'common'
import routes from '../../routes'

interface ICreateActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

export default function CreateActionMenu(props: ICreateActionMenuProps) {
  const { anchor, setAnchor } = props
  const history = useHistory()
  return (
    <PopoverLinks
      anchor={anchor}
      setAnchor={setAnchor}
      links={[
        {
          lable: 'Constructor',
          onClick: () => history.push(routes.constructor),
        },
        {
          lable: 'My Album',
          onClick: () => console.log('My Album'),
        },
        {
          lable: 'Create NFT - mint',
          onClick: () => history.push(routes.createNFT),
        },
      ]}
    />
  )
}
