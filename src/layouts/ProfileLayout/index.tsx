import React from 'react'
import { Box, CardMedia } from '@material-ui/core'
import { useStyles } from './styles'

interface IProfileLayoutProps {
  children: React.ReactChild
  coverURL: string
  aside: React.ReactElement | null
}

export default function ProfileLayout(props: IProfileLayoutProps) {
  const { children, coverURL, aside } = props
  const classes = useStyles()

  return (
    <>
      <CardMedia className={classes.cover} image={coverURL} />
      <Box className={classes.container}>
        <aside className={classes.aside}>{aside}</aside>
        {children}
      </Box>
    </>
  )
}
