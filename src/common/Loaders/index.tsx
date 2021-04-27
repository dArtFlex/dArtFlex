import React from 'react'

import { CircularProgress } from '@material-ui/core'

import { CircularProgressLoaderProps } from './types'

export default function CircularProgressLoader(props: CircularProgressLoaderProps) {
  let { height = 'auto' } = props
  const { size = 48, color = 'primary' } = props

  if (height === 'fullScreen') {
    height = `100vh`
  }

  const style = {
    display: 'grid',
    placeContent: 'center',
    width: '100%',
    height,
  }

  return (
    <div style={style}>
      <CircularProgress size={size} color={color} />
    </div>
  )
}
