import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
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
}))
