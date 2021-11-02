import { useState, useEffect, useCallback } from 'react'
import { walletService } from 'services/wallet_service'
import { IBaseTokens, IChaintIdHexFormat } from 'types'
import tokensAll from 'core/tokens'
import { networkConvertor, supportedNetwork, getChainKeyByContract } from 'utils'

interface ITokenInfoProps {
  contract?: string
  token?: Pick<IBaseTokens, 'id' | 'decimals' | 'name' | 'symbol'> & { tokenChain: IChaintIdHexFormat | number }
}

const useTokenInfo = (tokenContractAddress: ITokenInfoProps['contract'], contract: ITokenInfoProps['contract']) => {
  const [token, setToken] = useState<ITokenInfoProps['token']>()

  const getTokenInfo = useCallback(async () => {
    const chainId: number = walletService.getChainId()
    const convertChainId: IChaintIdHexFormat | number = networkConvertor(chainId)
    const chainKey = contract && getChainKeyByContract(contract)

    if (supportedNetwork(convertChainId) && typeof convertChainId !== 'number' && chainKey) {
      const tokenContract: IBaseTokens | undefined = tokensAll[chainKey].find((t) => t.id === tokenContractAddress)
      if (tokenContract) {
        setToken({
          id: tokenContract.id,
          decimals: tokenContract.decimals,
          name: tokenContract.name,
          symbol: tokenContract.symbol,
          tokenChain: chainKey,
        })
      }
    }
  }, [tokenContractAddress])

  useEffect(() => {
    if (tokenContractAddress && contract) {
      getTokenInfo()
    }
    return () => {
      getTokenInfo()
    }
  }, [tokenContractAddress])

  return token
}

export default useTokenInfo
