import { IApi } from '../../services/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, all, take, fork, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {
  getNotificationsFailure,
  getNotificationsRequest,
  getNotificationsSuccess,
} from 'stores/reducers/notifications'
import APP_CONFIG from 'config'
import { AssetTypes, INotifications, IImageData } from 'types'
import io, { Socket } from 'socket.io-client'
import { ISocketDataNotification } from 'types'

export function* getNotifications(api: IApi, { payload }: PayloadAction<{ socketData: ISocketDataNotification[] }>) {
  try {
    const notificationsImages: string[] = yield all(payload.socketData.map((n) => call(getImage, api, n.item_id)))
    const notifications: INotifications[] = payload.socketData.flatMap((n, i) => {
      const message = 'Please be informed about significant updates to your item'
      const updated_at = n.updated_at
      const item_id = n.item_id
      const read = n.read
      const id = n.id
      return { id, message, updated_at, item_id, read, image: notificationsImages[i] }
    })

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

let socket: Socket

function createSocketChannel(userId: string) {
  return eventChannel((emit) => {
    socket = io(APP_CONFIG.WSUrl, { query: { userId } })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    socket.on('connection', () => {
      console.log(socket.connected)
    })

    socket.on('notification', (data) => {
      emit({ data })
    })

    socket.on('message', (message) => {
      emit({ message })
    })

    const unsubscribe = () => {
      socket.send()
    }

    return unsubscribe
  })
}

export function* listenForSocketMessages({ payload }: PayloadAction<{ userId: string }>) {
  const socketChannel: string = yield call(createSocketChannel, payload.userId)
  while (true) {
    const { data: socketData } = yield take(socketChannel)
    yield fork(updateDataState, socketData)
  }
}

function* updateDataState(socketData: ISocketDataNotification[]) {
  // Here could be some switcher between socket event message
  yield put(getNotificationsRequest({ socketData }))
}

export function* updateForSocketMessagesData({ payload }: PayloadAction<{ id: number }>) {
  try {
    socket.send({
      id: payload.id,
      read: true,
    })

    const { notifications }: { notifications: INotifications[] } = yield select((state) => state.notifications)
    const unpdateNotifications = notifications.map((n) => (n.id === payload.id ? { ...n, read: true } : n))
    yield put(getNotificationsSuccess({ notifications: unpdateNotifications }))
  } catch (e) {
    yield put(getNotificationsFailure(e))
  }
}
