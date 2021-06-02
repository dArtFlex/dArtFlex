import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    informerBox: {
      padding: theme.spacing(5, 7),
      background: theme.palette.yellowLight,
      borderRadius: theme.spacing(3),
    },
    informerHead: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: theme.spacing(3),
      gap: 9,
      '& svg': {
        height: 22,
        width: 22,
      },
    },
  })
)
