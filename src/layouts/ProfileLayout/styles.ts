import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      width: '100vw',
      height: 300,
      margin: theme.spacing(-4, -10, 0),
      [theme.breakpoints.between(425, 768)]: {
        margin: theme.spacing(-4, -6, 0),
      },
      [theme.breakpoints.down(425)]: {
        margin: theme.spacing(-4, -2, 0),
      },
    },
    container: {
      display: 'flex',
      gap: theme.spacing(5),
      [theme.breakpoints.down(680)]: {
        flexDirection: 'column',
      },
    },
    aside: {
      maxWidth: 325,
      marginTop: theme.spacing(-25),
      [theme.breakpoints.down(680)]: {
        maxWidth: 'unset',
      },
    },
  })
)
