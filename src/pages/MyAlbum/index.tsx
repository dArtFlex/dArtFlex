import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { selectAlbum, selectUser } from 'stores/selectors'
import { PageWrapper } from 'common'
import { getUserAlbumRequest } from 'stores/reducers/album'
import { useStyles } from './styles'
import MyAlbumPicture from './components/MyAlbumPicture'
import { IAlbumEntities } from 'types'

export default function MyAlbum() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { album } = useSelector(selectAlbum())
  const { user } = useSelector(selectUser())

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAlbumRequest({ userId: user?.id }))
    }
  }, [user?.id])

  const pictures = album.map((el: IAlbumEntities) => el.image_url)

  return (
    <PageWrapper className={classes.myAlbumWrapper}>
      <>
        <Typography variant={'h1'}>My album</Typography>
        <Typography>{`${album.length} of 20 artworks`}</Typography>
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
