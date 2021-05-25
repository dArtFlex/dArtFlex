import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containter: {
      width: 'auto',
    },
    root: {
      color: theme.palette.primary.main,
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: theme.palette.primary.main,
      border: `6px solid ${theme.palette.background.default}`,
      boxShadow: theme.shadows[1],
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })
)
