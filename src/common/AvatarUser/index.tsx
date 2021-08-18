import React from 'react'
import { Box, Avatar, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { shortCutName } from '../../utils'

interface IAvatarUserProps {
  name: string
  image: string
  size?: number
  fontSize?: number
}

export default function AvatarUser(props: IAvatarUserProps) {
  const { name, image, size = 24, fontSize = 16 } = props
  const classes = useStyles({ size, fontSize })

  return (
    <Box className={classes.card}>
      <Avatar className={classes.avatar} alt="Avatar" src={image} />
      <Typography component={'span'} className={classes.userName}>
        {`@${shortCutName(name)}`}
      </Typography>
    </Box>
  )
}
