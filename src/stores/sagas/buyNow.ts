import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select, all } from 'redux-saga/effects'

export function* buyNow(api: IApi) {
  try {
  } catch (e) {
    console.log(e.message)
  }
}
