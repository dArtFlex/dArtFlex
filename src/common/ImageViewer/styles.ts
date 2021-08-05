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
        color: theme.palette.text.primary,
      },
      [theme.breakpoints.down(600)]: {
        top: 10,
        right: 10,
      },
    },
    cardImage: {
      width: 'inherit',
      objectFit: 'contain',
      borderRadius: theme.spacing(3),
      maxHeight: 630,
      maxWidth: '96%',
    },
  })
)
