import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchChain } from 'stores/reducers/chain'
import { selectChain } from 'stores/selectors'
import { PopoverLinks } from 'common'
import { Check as CheckIcon } from '@material-ui/icons'
import { IChainName, ILink } from 'types'

interface IChainActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

interface ILinks extends ILink {
  chainNameKey: IChainName
}

export default function ChainMenu(props: IChainActionMenuProps) {
  const { anchor, setAnchor } = props
  const { chainName } = useSelector(selectChain())
  const dispatch = useDispatch()

  const getIcon = (active: boolean) => (
    <CheckIcon fill={'green'} style={{ display: active ? 'inline-block' : 'none' }} />
  )

  const links: ILinks[] = [
    {
      chainNameKey: '__eth',
      lable: 'ETH',
      onClick: () => dispatch(switchChain({ chainName: '__eth', chainId: 1 })),
      disabled: true,
    },
    {
      chainNameKey: '__bsc',
      lable: 'BSC',
      onClick: () => dispatch(switchChain({ chainName: '__bsc', chainId: 56 })),
    },
    {
      chainNameKey: '__polygon',
      lable: 'Polygon',
      onClick: () => dispatch(switchChain({ chainName: '__polygon', chainId: 137 })),
    },
    {
      chainNameKey: '__ethRinkeby',
      lable: 'Rinkeby*',
      onClick: () => dispatch(switchChain({ chainName: '__ethRinkeby', chainId: 4 })),
    },
    {
      chainNameKey: '__bscTestnet',
      lable: 'BSC*',
      onClick: () => dispatch(switchChain({ chainName: '__bscTestnet', chainId: 97 })),
    },
  ]
  const linksData = links.map((link) => {
    const { chainNameKey, ...rest } = link
    return { ...rest, icon: getIcon(chainNameKey === chainName) }
  })

  return <PopoverLinks anchor={anchor} setAnchor={setAnchor} links={linksData} />
}
