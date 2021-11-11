import React from 'react'
import { useSelector } from 'react-redux'
import { selectWalletChainName } from 'stores/selectors'
import { PopoverLinks } from 'common'
import { Check as CheckIcon } from '@material-ui/icons'
import { IChainName } from 'types'

interface IChainActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

interface ILinks {
  chainNameKey: IChainName
  lable: string
  onClick: () => void
}

export default function ChainMenu(props: IChainActionMenuProps) {
  const { anchor, setAnchor } = props
  const { chainName } = useSelector(selectWalletChainName())

  const getIcon = (active: boolean) => (
    <CheckIcon fill={'green'} style={{ display: active ? 'inline-block' : 'none' }} />
  )

  const links: ILinks[] = [
    {
      chainNameKey: '__eth',
      lable: 'ETH',
      onClick: () => console.log('ETH chain'),
    },
    {
      chainNameKey: '__bsc',
      lable: 'BSC',
      onClick: () => console.log('BSK chain'),
    },
    {
      chainNameKey: '__polygon',
      lable: 'Polygon',
      onClick: () => console.log('Polygon chain'),
    },
  ]
  const linksData = links.map((link) => {
    const { chainNameKey, ...rest } = link
    return { ...rest, icon: getIcon(chainNameKey === chainName) }
  })

  return <PopoverLinks anchor={anchor} setAnchor={setAnchor} links={linksData} />
}
