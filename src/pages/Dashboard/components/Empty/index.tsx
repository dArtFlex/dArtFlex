import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(17, 0),
      alignItems: 'flex-start',
      textAlign: 'center',
      [theme.breakpoints.down(768)]: {
        margin: theme.spacing(10, 0),
      },
    },
    box: {
      maxWidth: 370,
      display: 'flex',
      flexDirection: 'column',
    },
    text: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(5),
    },
    btn: {
      fontSize: 14,
      padding: theme.spacing(4, 5),
      maxWidth: 150,
      alignSelf: 'center',
    },
  })
)

export default function Empty() {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.box}>
        <Typography className={classes.text}>
          Your collection of artworks is empty. Start building your collection by placing bids on artwork.
        </Typography>
        <Button variant={'outlined'} className={classes.btn}>
          Go to Artworks
        </Button>
      </Box>
    </Box>
  )
}
