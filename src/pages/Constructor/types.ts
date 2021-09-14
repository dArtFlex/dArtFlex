export interface IGalleryImage {
  tokenId: string
  src: string
  selected: boolean
}

export interface IConstructor {
  tokenId0: string
  tokenId1: string
  file0: null | File | string
  file1: null | File | string
  images: IGalleryImage[]
}

export type ConstructorSource = 'library' | 'uploader' | 'generated'
