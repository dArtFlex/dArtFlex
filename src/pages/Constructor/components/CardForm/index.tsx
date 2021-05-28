import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { ICardForm } from './types'
import { useStyles } from './styles'

export default function CardForm(props: ICardForm) {
  const classes = useStyles()
  const { title, onClick, icon } = props

  return (
    <Card className={classes.cardForm} onClick={onClick}>
      {icon}
      <Typography>{title}</Typography>
    </Card>
  )
}
