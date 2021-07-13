import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  datePicker: {
    '&.MuiInput-underline': {
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },
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
}))
