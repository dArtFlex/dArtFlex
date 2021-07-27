import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
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
      [theme.breakpoints.between(480, 520)]: {
        width: '86vw',
      },
      [theme.breakpoints.down(480)]: {
        width: '90vw',
      },
    },
  })
)
