import React from 'react'
import { Image } from 'common'
import { useStyles } from './styles'

interface IImagePreviewProps {
  file: File | unknown
}

export default function ImagePreview(props: IImagePreviewProps) {
  const { file } = props
  const classes = useStyles()
  return <Image file={file as File} className={classes.imagePreview} />
}
