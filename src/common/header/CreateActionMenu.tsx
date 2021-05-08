import React from 'react'
import { useHistory } from 'react-router-dom'
import { PopoverLinks } from 'common'

interface ICreateActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

export default function CreateActionMenu(props: ICreateActionMenuProps) {
  const { anchor, setAnchor } = props
  return (
    <PopoverLinks
      anchor={anchor}
      setAnchor={setAnchor}
      links={[
        {
          lable: 'My Images',
          onClick: () => console.log('My Images'),
        },
        {
          lable: 'Constructor',
          onClick: () => console.log('Constructor'),
        },
        {
          lable: 'Create NFT',
          onClick: () => console.log('Create NFT'),
        },
        {
          lable: 'Submit NFTs',
          onClick: () => console.log('Submit NFTs'),
        },
      ]}
    />
  )
}
