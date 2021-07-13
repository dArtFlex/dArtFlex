import React from 'react'
import { useStyles } from '../styles'
import { Box, CardMedia, Typography } from '@material-ui/core'

export default function AboutCreator() {
  const classes = useStyles()

  return (
    <Box className={classes.aboutCreatorWrapper}>
      <Box display="flex">
        <CardMedia
          className={classes.userAboutAvatar}
          image="https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <Box className={classes.creatorInfo}>
          <Typography variant={'h2'}>Giana Press</Typography>
          <Typography className={classes.textBold}>@gianapress</Typography>
        </Box>
      </Box>
      <Typography className={classes.descriptionText}>
        Tiana is the Co-founder and Creative Director at Toast. He is a 3D artist that specializes in creating
        whimsical, vibrant content.
      </Typography>
    </Box>
  )
}
