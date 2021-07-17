import React from 'react'
import { CardMedia, CardMediaProps } from '@material-ui/core'

interface IImageProps extends Omit<CardMediaProps, 'classes'> {
  file?: File
  src?: string
  title?: string
  className?: string
}

export default function Image(props: IImageProps) {
  const { className = '', file, src, title } = props

  return file ? (
    <CardMedia className={className} title={title}>
      <img src={URL.createObjectURL(file)} alt={file?.name} />
    </CardMedia>
  ) : (
    <CardMedia className={className} image={src} title={title} component={'img'} />
  )
}
