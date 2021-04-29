import { ReactNode } from 'react'

export interface ICustomChipProps {
  avatar: JSX.Element | string
  children: ReactNode
  startIcon?: boolean
  endIcon?: boolean
  classNames?: Partial<{
    buttonRoot: string
    avatarRoot: string
  }>
}
