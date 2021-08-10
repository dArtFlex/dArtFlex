import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardUpload: {
      minWidth: 325,
      minHeight: 460,
      padding: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexDirection: 'column',
      gap: theme.spacing(10),
      [theme.breakpoints.down(640)]: {
        minWidth: 'unset',
        width: '94vw',
      },
    },
    text: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
  })
)
