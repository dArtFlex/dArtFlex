import { useState, useEffect, useCallback } from 'react'
import { walletService } from 'services/wallet_service'
import { IBaseTokens, IChaintIdHexFormat } from 'types'
import tokensAll from 'core/tokens'
import { networkConvertor, supportedNetwork } from 'utils'

interface ITokenInfoProps {
  tokenContractAddress?: string
  token?: Pick<IBaseTokens, 'id' | 'decimals' | 'name' | 'symbol'>
}

const useTokenInfo = (tokenContractAddress: ITokenInfoProps['tokenContractAddress']) => {
  const [token, setToken] = useState<ITokenInfoProps['token']>()

  const getTokenInfo = useCallback(async () => {
    if (tokenContractAddress === '0x') {
      const chainId: number = walletService.getChainId()
      const convertChainId: IChaintIdHexFormat | number = networkConvertor(chainId)

      if (supportedNetwork(convertChainId) && typeof convertChainId !== 'number') {
        const tokenContractETH: IBaseTokens = tokensAll[convertChainId].find((t) => t.id === '0x') as IBaseTokens
        setToken({
          id: tokenContractETH.id,
          decimals: tokenContractETH.decimals,
          name: tokenContractETH.name,
          symbol: tokenContractETH.symbol,
        })
      }
    } else if (tokenContractAddress) {
      const tokenContract = walletService.getTokenContract(tokenContractAddress)
      const decimals = await tokenContract.methods.decimals().call()
      const name = await tokenContract.methods.name().call()
      const symbol = await tokenContract.methods.symbol().call()
      setToken({
        id: tokenContractAddress,
        decimals,
        name,
        symbol,
      })
    }
  }, [tokenContractAddress])

  useEffect(() => {
    getTokenInfo()
    return () => {
      getTokenInfo()
    }
  }, [tokenContractAddress])

  return token
}

export default useTokenInfo
