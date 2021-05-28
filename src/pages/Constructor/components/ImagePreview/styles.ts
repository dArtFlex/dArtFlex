import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    imagePreview: {
      width: 440,
      height: 346,
      '& img': {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        objectFit: 'cover',
      },
    },
  })
)
