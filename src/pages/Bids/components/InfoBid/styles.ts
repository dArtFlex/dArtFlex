import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoBox: {
      padding: theme.spacing(10, 6),
      background: theme.palette.greyPale,
      borderRadius: 12,
      minWidth: 440,
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
    infoBoxDesc: {
      margin: theme.spacing(3.5, 0, 8),
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '150%',
    },
    linkBox: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingBottom: theme.spacing(8),
    },
    btnGoTo: {
      color: theme.palette.white,
      background: theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.text.primary,
      },
    },
  })
)
