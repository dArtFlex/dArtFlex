import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'relative',
      display: 'flex',
      width: 628,
      minHeight: 424,
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(3),
    },
    aside: {
      height: 424,
      width: 132,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      borderTopLeftRadius: theme.spacing(3),
      borderBottomLeftRadius: theme.spacing(3),
      '&>img': {
        maxWidth: 'auto',
        maxHeight: '100%',
        objectFit: 'contain',
      },
      [theme.breakpoints.down(600)]: {
        width: 80,
      },
    },
    modalBtnClose: {
      border: `1px solid ${theme.palette.grey['200']}`,
      backgroundColor: theme.palette.background.paper,
      position: 'absolute',
      top: theme.spacing(4),
      right: theme.spacing(4),
      minWidth: 40,
      height: 40,
      padding: 13,
      color: theme.palette.text.primary,
      '& svg': {
        width: 14,
        height: 14,
      },
      [theme.breakpoints.down(600)]: {
        right: theme.spacing(2),
      },
    },
  })
)
