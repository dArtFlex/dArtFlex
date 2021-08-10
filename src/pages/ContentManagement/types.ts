import React from 'react'

export type INFTCard = {
  url: string
  name: string
  item_id: string
  onChangePromotion: (event: React.ChangeEvent<HTMLInputElement>) => void
  onAddPromotion: () => void
  onDeletePromotion: () => void
}

export type IWorksRow = {
  id: number
  name: string
  creator: string
  owner: string
  isActive: boolean
  pictureURL: string
}

export type IUsersRow = {
  id: number
  firstname: string
  lastname: string
  username: string
  isActive: boolean
  avatar: string
}

export type IRowsPerPageType = 10 | 25 | 50 | 100

export interface INewPromotion {
  tokenData: {
    id: number
  }
  imageData: {
    image: string
    name: string
  }
  marketData: {
    item_id: string
  }
}
