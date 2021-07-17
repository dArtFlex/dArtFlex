import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  datePicker: {
    backgroundColor: theme.palette.background.default,
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
  datePickerPopover: {
    '& .MuiPickersToolbarText-toolbarTxt': {
      color: '#fff',
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      color: '#fff',
    },
    '& .MuiTab-textColorInherit': {
      color: theme.palette.greyDark,
    },
    '& .MuiPickersDay-daySelected': {
      color: '#fff',
    },
    '& .MuiPickersDay-current': {
      border: `1px solid ${theme.palette.greyMid}`,
    },
    '& .MuiPickersClockNumber-clockNumberSelected': {
      color: '#fff',
    },
  },
}))
