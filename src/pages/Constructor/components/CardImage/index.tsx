import React from 'react'
import { Box } from '@material-ui/core'
import { Image, Field } from 'common'
import { ICardImage } from './types'
import { useStyles } from './styles'

export default function CardImage(props: ICardImage) {
  const { src, name, onClick, disabled } = props
  const classes = useStyles()

  return (
    <Box className={classes.cardImage}>
      <Image src={src} className={classes.image} />
      <Field
        type={'checkbox'}
        name={name}
        className={classes.cardImageCheckbox}
        onClick={onClick}
        disabled={disabled}
      />
    </Box>
  )
}
