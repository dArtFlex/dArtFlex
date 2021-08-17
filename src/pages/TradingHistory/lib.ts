import { UserStateType } from 'stores/reducers/user/types'
import { ITradingHistory, IFilterTypes } from './types'

export function useComposeTradingData({
  tradingHistoryAll,
}: {
  tradingHistoryAll?: UserStateType['tradingHistoryAll']
}): ITradingHistory[] {
  if (!tradingHistoryAll?.length) {
    return []
  }
  const tradingHistoryIds: string[] = []
  tradingHistoryAll.forEach((item) => {
    tradingHistoryIds.push(item.item_id)
  })
  return tradingHistoryAll
    .map((th, index) => {
      return {
        action: th.status,
        token: {
          tokenId: th.item_id,
          name: th.imageData.name,
          image: th.imageData.image,
        },
        from: th.fromUserData.userid,
        to: th.toUserData.userid,
        date: th.created_at,
        amount: th.bid_amount,
        expDate: '',
        etherscanLink: '',
        status: th.status,
        order_id: th.order_id,
        bid_id: th.bid_id,
        isLastActionOnItem: tradingHistoryIds.lastIndexOf(th.item_id) === index,
      }
    })
    .reverse()
}

export function useTradingHistoryByFilter({
  tradingHistory,
  filterBy,
}: {
  tradingHistory: ITradingHistory[]
  filterBy: IFilterTypes[]
}) {
  return filterBy.length ? tradingHistory.filter((th) => filterBy.some((el) => el === th.action)) : tradingHistory
}

export function useSearchTradingHistory({
  tradingHistory,
  search,
}: {
  tradingHistory: ITradingHistory[]
  search: string
}) {
  if (!search.length) {
    return tradingHistory
  }
  return tradingHistory.filter((row) => {
    const match = (value: string) => value.match(new RegExp(search, 'gi')) !== null
    return match(row.action) || match(row.token.name) || match(row.from) || match(row.to)
  })
}
