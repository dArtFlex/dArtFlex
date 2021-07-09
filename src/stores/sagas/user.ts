import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, all } from 'redux-saga/effects'
import { history } from '../../navigation'
import BigNumber from 'bignumber.js'
import {
  getUserDataFailure,
  getUserDataSuccess,
  createNewUserSuccess,
  createNewUserFailure,
  getUserBalancesSuccess,
  getUserBalancesFailure,
} from 'stores/reducers/user'
import { UserStateType } from 'stores/reducers/user/types'
import { IAccountSettings } from 'pages/AccountSettings/types'
import { walletService } from 'services/wallet_service'
import { UserDataTypes, IChainId, ITokenBalances, IBaseTokens } from 'types'
import APP_CONFIG from 'config'
import tokensAll from 'core/tokens'
import { getIdFromString } from 'utils'

export function* getUserData(api: IApi, { payload }: PayloadAction<{ wallet: string }>) {
  try {
    const userData: UserStateType['user'][] = yield call(api, {
      url: APP_CONFIG.getUserByWallet(payload.wallet),
    })
    yield put(getUserDataSuccess({ userData: userData[0] }))
  } catch ({ message = '' }) {
    history.push('/')
    yield put(getUserDataFailure(message))
  }
}

export function* getUserDataByOwner(api: IApi, owner: string) {
  try {
    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByOwner(owner),
    })
    return userData[0]
  } catch (e) {
    yield put(getUserDataFailure(e.message || e))
  }
}

function* uploadImage(api: IApi, file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file as File)
    const imageUrl: string = yield call(api, {
      method: 'POST',
      url: APP_CONFIG.uploadImage,
      data: formData,
      transform: false,
    })
    return imageUrl
  } catch (e) {
    console.log(e)
  }
}

export function* createNewUser(
  api: IApi,
  { payload: { accountSettings, wallet } }: PayloadAction<{ accountSettings: IAccountSettings; wallet: string }>
) {
  try {
    const { profile_image, cover_image, fullname, userid, email, overview, socials } = accountSettings
    const { website, twitter, instagram, discord, facebook, youtube, tiktok, otherUrl } = socials

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profileImageUrl: string = yield call(uploadImage as any, api, profile_image)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coverImageUrl: string = yield call(uploadImage as any, api, cover_image)

    const formData = new FormData()
    formData.append('profile_image', profileImageUrl)
    formData.append('cover_image', coverImageUrl)
    formData.append('fullname', fullname)
    formData.append('userid', userid)
    formData.append('email', email)
    formData.append('wallet', wallet)
    formData.append('overview', overview)
    formData.append('website', website)
    formData.append('twitter', twitter)
    formData.append('instagram', instagram)
    formData.append('discord', discord)
    formData.append('facebook', facebook)
    formData.append('youtube', youtube)
    formData.append('tiktok', tiktok)
    formData.append('otherUrl', otherUrl)

    const userProfileId: string = yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/user/create',
      data: formData,
      transform: false,
    })

    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(getIdFromString(userProfileId) as number),
    })

    yield put(createNewUserSuccess({ userData: userData[0] }))
  } catch ({ message = '' }) {
    yield put(createNewUserFailure(message))
  }
}

export function* getUserBalances(api: IApi, { payload }: PayloadAction<{ wallet: string }>) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const tokens: Array<IBaseTokens> = tokensAll[chainId].filter((t) => t.id.startsWith('0x'))
    const balances: Array<ITokenBalances | undefined> = yield all(
      tokens.map((t) => call(getBalance, api, t, payload.wallet))
    )

    const existBalances = balances.filter((b) => b && b.balance !== '0')
    yield put(getUserBalancesSuccess({ balances: existBalances as ITokenBalances[] | [] }))
  } catch (e) {
    yield put(getUserBalancesFailure(e.message || e))
  }
}

function* getBalance(api: IApi, token: IBaseTokens, acc: string) {
  try {
    const { id, decimals, symbol } = token

    if (acc && id) {
      const tokenContract = walletService.getTokenContract(id)
      const balance: string = yield tokenContract.methods.balanceOf(acc).call()
      if (balance !== '0') {
        const _balance = new BigNumber(balance)
          .div(`10e${decimals - 1}`)
          .toNumber()
          .toFixed(2)

        const price: { [key: string]: number } = yield call(api, {
          url: APP_CONFIG.exchangeRate(symbol, 'USD'),
          method: 'GET',
        })
        const _price = price?.USD
        return {
          id,
          symbol,
          balance: _balance,
          priceUSD: _price,
          balanceUSD: new BigNumber(_balance).times(_price).toNumber(),
        }
      }
    }
  } catch (e) {
    throw new Error(e.message || `getBalance: ${e}`)
  }
}
