import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoRowIcon: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      '& svg': {
        width: 20,
        height: 20,
        marginLeft: theme.spacing(1.5),
      },
    },
    helperText: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
    tooltip: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      padding: theme.spacing(4, 6),
      fontSize: 16,
      minWidth: 416,
      boxShadow: theme.shadows[4],
      borderRadius: theme.spacing(3),
    },
    tooltipIcon: {
      fill: theme.palette.text.primary,
      '&:hover': {
        fill: theme.palette.primary.main,
      },
    },
  })
)
