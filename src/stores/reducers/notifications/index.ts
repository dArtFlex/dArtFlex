import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationsStateType } from './types'

const initialState: NotificationsStateType = {
  fetching: false,
  transacting: false,
  error: '',
  notifications: [],
  bids: 0,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotificationsRequest: (state, i) => {
      state.transacting = true
    },
    getNotificationsSuccess: (
      state,
      { payload }: PayloadAction<{ notifications: NotificationsStateType['notifications'] }>
    ) => {
      state.notifications = payload.notifications
      state.transacting = false
    },
    getNotificationsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.transacting = false
    },

    listenForSocketMessagesRequest: (state, i) => state,
    updateForSocketMessagesDataRequest: (state, i) => state,
  },
})

export const {
  getNotificationsRequest,
  getNotificationsSuccess,
  getNotificationsFailure,

  listenForSocketMessagesRequest,
  updateForSocketMessagesDataRequest,
} = notificationsSlice.actions

export const { reducer } = notificationsSlice
