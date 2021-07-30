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
          lable: 'Create NFT - mint',
          onClick: () => history.push(routes.createNFT),
        },
        {
          lable: 'Constructor AI',
          onClick: () => history.push(routes.constructor),
        },
        // Todo: Would be implemented in next version
        // {
        //   lable: 'My Album',
        //   onClick: () => console.log('My Album'),
        // },
      ]}
    />
  )
}
