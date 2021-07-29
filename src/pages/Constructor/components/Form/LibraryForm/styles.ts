import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    libraryContainer: {
      position: 'relative',
      alignSelf: 'flex-start',
      width: '100%',
    },
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(322px, 1fr))',
      gap: 20,
      [theme.breakpoints.down(480)]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      [theme.breakpoints.down(319)]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      },
    },
  })
)
