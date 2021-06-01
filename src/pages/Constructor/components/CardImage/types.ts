import { IGalleryImage } from '../../types'

export interface ICardImage extends Omit<IGalleryImage, 'tokenId'> {
  onClick: () => void
  name: string
  disabled?: boolean
}
