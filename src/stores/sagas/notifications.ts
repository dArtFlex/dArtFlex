import { IApi } from '../../services/types'
import { call, put, select, all } from 'redux-saga/effects'
import { getNotificationsFailure, getNotificationsSuccess } from 'stores/reducers/notifications'
import APP_CONFIG from 'config'
import { ITradingHistory, IComposeHistory, AssetTypes, INotifications, IImageData } from 'types'

export function* getNotifications(api: IApi) {
  try {
    const { id: userId }: { id: number } = yield select((state) => state.user.user)

    if (!userId) {
      yield put(getNotificationsFailure("User ID doesn't exist!"))
      return
    }

    const tradingHistoryByUser: ITradingHistory[] = yield call(api, {
      url: APP_CONFIG.getHistoryTradingByUserId(userId),
    })

    const selectItemIds = new Set()
    tradingHistoryByUser.forEach((th) => selectItemIds.add(th.item_id))

    const getItemsHistory: ITradingHistory[][] = yield all(
      Array.from(selectItemIds).map((item_id) =>
        call(api, {
          url: APP_CONFIG.getHistoryNFT(Number(item_id)),
        })
      )
    )

    const composeHistory: IComposeHistory[] = getItemsHistory.map((th: ITradingHistory[]) => {
      const isSoldIndex = th.findIndex((h: ITradingHistory) => h.status === 'sold')
      const ownership =
        (isSoldIndex && th[isSoldIndex]?.to === String(userId)) || (th[1] && th[1]?.from === String(userId))
      return ownership
        ? {
            type: 'owner',
            history: th,
          }
        : {
            type: 'buyer',
            history: th,
          }
    })
    const ownerHasBid: INotifications[] = composeHistory.reduce((acc: INotifications[], cr) => {
      if (cr.type === 'owner') {
        const findLastBid = cr.history.reverse().find((h) => h.status === 'bidded')

        if (findLastBid) {
          acc.push({
            message: 'Your Item has been bid',
            updated_at: findLastBid.updated_at,
            item_id: findLastBid.item_id,
            image: '',
            status: false,
          })
          return acc
        }
        return acc
      }
      return acc
    }, [])

    const notificationsImages: string[] = yield all(ownerHasBid.map((n) => call(getImage, api, n.item_id)))
    const notifications = ownerHasBid.flatMap((h, i) => ({ ...h, image: notificationsImages[i] }))

    yield put(getNotificationsSuccess({ notifications }))
  } catch (e) {
    yield put(getNotificationsFailure(e))
  }
}

function* getImage(api: IApi, item_id: string) {
  const assetById: AssetTypes[] = yield call(api, {
    url: APP_CONFIG.getItemByItemId(Number(item_id)),
  })
  const imageData: IImageData[] = yield call(api, {
    url: assetById[0].uri,
  })
  return imageData[0].image
}
