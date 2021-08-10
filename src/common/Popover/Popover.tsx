import React from 'react'
import { Popover as MUIPopover, PopoverOrigin } from '@material-ui/core'

interface IPopoverProps {
  anchorEl?: HTMLElement | null
  onClose: () => void
  children: React.ReactNode
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  className?: string
}

export default function Popover(props: IPopoverProps) {
  const {
    anchorEl,
    children,
    onClose,
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'right',
    },
    className = '',
  } = props

  return (
    <MUIPopover
      elevation={3}
      getContentAnchorEl={null}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      className={className}
    >
      {children}
    </MUIPopover>
  )
}
