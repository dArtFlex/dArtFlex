import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    rootControl: {
      alignItems: 'center',
    },
    label: {
      wordBreak: 'break-word',
    },
    root: {},
    checked: {},
    disabled: {},
  })
)
