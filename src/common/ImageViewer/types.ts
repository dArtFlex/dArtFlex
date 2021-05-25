export interface IImageViewer {
  images: File[] | FileList | string[]
  asFiles?: boolean
  open: boolean
  onClose: () => void
}
