export interface IGalleryImage {
  tokenId: string
  src: string
  selected: boolean
}

export interface IConstructor {
  tokenId0: string
  tokenId1: string
  file0: string
  file1: string
  images: IGalleryImage[]
}

export type ConstructorSource = 'library' | 'uploader' | 'generated'
