import { useState, useEffect, useCallback } from 'react'
import { walletService } from 'services/wallet_service'
import { IBaseTokens } from 'types'

interface ITokenInfoProps {
  tokenContractAddress?: string
  token?: Pick<IBaseTokens, 'id' | 'decimals' | 'name' | 'symbol'>
}

const useTokenInfo = (tokenContractAddress: ITokenInfoProps['tokenContractAddress']) => {
  const [token, setToken] = useState<ITokenInfoProps['token']>()

  const getTokenInfo = useCallback(async () => {
    if (tokenContractAddress) {
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
