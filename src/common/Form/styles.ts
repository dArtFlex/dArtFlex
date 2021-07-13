import { makeStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timePickerWrapper: {
      padding: theme.spacing(2, 2),
      marginLeft: theme.spacing(4),
    },
    timePicker: {
      '& div': {
        '&.MuiInput-underline:before': {
          borderBottom: 'none',
        },
      },
    },
  })
)
