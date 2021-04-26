import { ModalProps } from '@material-ui/core'

export interface IModalProps {
  open: boolean
  onClose: () => void
  body: JSX.Element
  withAside?: boolean
  classNames?: Partial<{
    root: ModalProps['classes']
  }>
}
