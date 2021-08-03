import React, { useState } from 'react'
import { PageWrapper } from 'common'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { DownloadIcon } from '../../common/icons'
import MyAlbumPicture from './components/MyAlbumPicture'

export default function MyAlbum() {
  const classes = useStyles()

  const pictures = [
    'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
    'https://www.nawpic.com/media/2020/cool-pictures-for-nawpic-33.jpg',
    'https://cdn.gamer-network.net/2018/usgamer/no_mans_sky_pretty_pictures_featured.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/the-most-beautiful-pictures-taken-in-no-mans-sky.jpg',
    'https://thebig.co/images/blogs/vertical_panorama02.jpg',
    'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dmVydGljYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    'https://wallpapershome.com/images/pages/pic_v/17861.jpg',
    'https://images.unsplash.com/photo-1546587348-d12660c30c50?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://assets.unenvironment.org/s3fs-public/styles/topics_content_promo/public/2021-05/alberta-2297204_1920.jpg?itok=aim5GFuY',
  ]
  return (
    <PageWrapper className={classes.myAlbumWrapper}>
      <>
        <Typography variant={'h1'}>My album</Typography>
        <Typography>8 of 20 artworks</Typography>
        <Box className={classes.myAlbumPicsContainer}>
          {pictures.map((src, index) => {
            return (
              <Box key={index}>
                <MyAlbumPicture src={src} />
              </Box>
            )
          })}
        </Box>
      </>
    </PageWrapper>
  )
}
