import React, { useState } from 'react'
import { useStyles } from '../styles'
import { Box } from '@material-ui/core'
import { DownloadIcon } from '../../../common/icons'
import clsx from 'clsx'

interface IMyAlbumPicture {
  src: string
}

export default function MyAlbumPicture(props: IMyAlbumPicture) {
  const classes = useStyles()
  const { src } = props
  const [isPicMenuActive, setIsPicMenuActive] = useState(false)

  return (
    <Box
      className={clsx(classes.myAlbumPicWrapper, isPicMenuActive && classes.picWrapperHover)}
      onMouseEnter={() => setIsPicMenuActive(true)}
      onMouseLeave={() => setIsPicMenuActive(false)}
    >
      <img src={src} />
      {isPicMenuActive && (
        <Box className={classes.picMenuBox}>
          <DownloadIcon />
        </Box>
      )}
    </Box>
  )
}
