import { ModalProps } from '@material-ui/core'

export interface IModalProps {
  open: boolean
  onClose: () => void
  body: JSX.Element
  withAside?: boolean
  withoutCloseBtn?: boolean
  disableEscapeKeyDown?: boolean
  disableBackdropClick?: boolean
  classNames?: Partial<{
    root: ModalProps['classes']
  }>
}
