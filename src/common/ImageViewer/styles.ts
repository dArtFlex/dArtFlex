import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      background: theme.palette.accent,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBtnClose: {
      position: 'absolute',
      top: theme.spacing(10),
      right: theme.spacing(10),
      minWidth: 40,
      height: 40,
      padding: 13,
      '& svg': {
        width: 14,
        height: 14,
      },
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
    cardImage: {
      padding: theme.spacing(21),
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: theme.spacing(3),
      },
    },
  })
)
