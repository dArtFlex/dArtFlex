import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    informerBox: {
      padding: theme.spacing(5, 7),
      background: theme.palette.success.main,
      borderRadius: theme.spacing(3),
      width: 310,
      marginRight: theme.spacing(6),
    },
    informerHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: theme.spacing(3),
      gap: 9,
      '& svg': {
        height: 22,
        width: 22,
      },
    },
  })
)
