import React from 'react'
import { PopoverLinks } from 'common'

interface IChainActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

export default function ChainMenu(props: IChainActionMenuProps) {
  const { anchor, setAnchor } = props
  return (
    <PopoverLinks
      anchor={anchor}
      setAnchor={setAnchor}
      links={[
        {
          lable: 'ETH',
          onClick: () => console.log('ETH chain'),
        },
        {
          lable: 'BSC',
          onClick: () => console.log('BSK chain'),
        },
        {
          lable: 'Polygon',
          onClick: () => console.log('Polygon chain'),
        },
      ]}
    />
  )
}
