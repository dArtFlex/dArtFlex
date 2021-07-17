import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootControl: {
      alignItems: 'flex-start',
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(-3),
    },
    label: {
      wordBreak: 'break-word',
      paddingTop: theme.spacing(2),
    },
    root: {
      width: 55,
      height: 32,
      padding: 0,
      margin: theme.spacing(0, 3),
      backgroundColor: theme.palette.background.default,
    },
    switchBase: {
      width: 32,
      height: 32,
      padding: 1,
      '& + $track': {
        border: `3px solid ${theme.palette.text.primary}`,
        borderRadius: 24,
      },
      '&$checked': {
        transform: 'translateX(24px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: `linear-gradient(129.22deg, #5239AE 6.8%, #7F82F5 134.28%)`,
          border: 'none',
          opacity: 1,
        },
        '& $thumb': {
          backgroundColor: theme.palette.white,
        },
      },
    },
    thumb: {
      width: 18,
      height: 18,
      backgroundColor: theme.palette.text.primary,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  })
)
