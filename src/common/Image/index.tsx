import React from 'react'
import { CardMedia, CardMediaProps } from '@material-ui/core'

interface IImageProps extends Omit<CardMediaProps, 'classes'> {
  file?: File
  src?: string
  title?: string
  classNames?: string
}

export default function Image(props: IImageProps) {
  const { classNames = '', file, src, title } = props

  return file ? (
    <CardMedia className={classNames} title={title}>
      <img src={URL.createObjectURL(file)} alt={file?.name} />
    </CardMedia>
  ) : (
    <CardMedia className={classNames} src={src} title={title} />
  )
}
