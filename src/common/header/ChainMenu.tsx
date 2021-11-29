import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { switchChain } from 'stores/reducers/chain'
import { selectChain } from 'stores/selectors'
import { PopoverLinks } from 'common'
import { Check as CheckIcon } from '@material-ui/icons'
import { IChainName, ILink, IChainIdDecimalsFormat } from 'types'

interface IChainActionMenuProps {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

interface ILinks extends ILink {
  chainNameKey: IChainName
}

export default function ChainMenu(props: IChainActionMenuProps) {
  const { anchor, setAnchor } = props
  const { chainNames, chainIds } = useSelector(selectChain())
  const dispatch = useDispatch()

  const getIcon = (active: boolean) => (
    <CheckIcon fill={'green'} style={{ display: active ? 'inline-block' : 'none' }} />
  )

  const handleChain = ({ chainName, chainId }: { chainName: IChainName; chainId: IChainIdDecimalsFormat }) => {
    const _chainNames = chainNames.some((cN) => cN === chainName)
      ? chainNames.filter((cN) => cN !== chainName)
      : [...chainNames, chainName]

    const _chainIds = chainIds.some((cID) => cID === chainId)
      ? chainIds.filter((cID) => cID !== chainId)
      : [...chainIds, chainId]

    dispatch(switchChain({ chainNames: _chainNames, chainIds: _chainIds }))
  }

  const links: ILinks[] = [
    {
      chainNameKey: '__eth',
      lable: 'ETH',
      onClick: () => handleChain({ chainName: '__eth', chainId: 1 }),
      disabled: true,
    },
    {
      chainNameKey: '__bsc',
      lable: 'BSC',
      onClick: () => handleChain({ chainName: '__bsc', chainId: 56 }),
    },
    {
      chainNameKey: '__polygon',
      lable: 'Polygon',
      onClick: () => handleChain({ chainName: '__polygon', chainId: 137 }),
    },
    {
      chainNameKey: '__ethRinkeby',
      lable: 'Rinkeby*',
      onClick: () => handleChain({ chainName: '__ethRinkeby', chainId: 4 }),
    },
    {
      chainNameKey: '__bscTestnet',
      lable: 'BSC*',
      onClick: () => handleChain({ chainName: '__bscTestnet', chainId: 97 }),
    },
  ]
  const linksData = links.map((link) => {
    const { chainNameKey, ...rest } = link
    return { ...rest, icon: getIcon(chainNames.some((cN) => cN === chainNameKey)) }
  })

  return <PopoverLinks anchor={anchor} setAnchor={setAnchor} links={linksData} />
}
