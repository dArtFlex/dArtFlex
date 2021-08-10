import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popper: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3),
      flexWrap: 'wrap',
      rowGap: 16,
      justifyContent: 'center',
    },
    cardImages: {
      display: 'flex',
      gap: theme.spacing(3),
    },
    cardImage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `${theme.palette.greyLight}`,
      width: 90,
      height: 90,
      borderRadius: 8,
      backgroundColor: theme.palette.grey['400'],
      [theme.breakpoints.down(480)]: {
        width: 60,
        height: 60,
      },
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    imageNumber: {
      color: theme.palette.text.secondary,
      fontWeight: 700,
      fontSize: 24,
    },
    btnSelected: {
      padding: theme.spacing(3.5, 5),
      margin: theme.spacing(0, 10, 0, 13),
      maxHeight: 50,
    },
    btnText: {
      color: theme.palette.white,
      fontSize: 16,
      fontWeight: 700,
    },
  })
)
