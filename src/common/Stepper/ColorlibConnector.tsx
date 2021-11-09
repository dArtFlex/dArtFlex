import { withStyles } from '@material-ui/core/styles'
import { StepConnector } from '@material-ui/core'

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: '-60%',
    '@media(max-width:767px)': {
      left: '-100%',
    },
    '@media(max-width:486px)': {
      left: '-120%',
    },
    '@media(max-width:440px)': {
      left: '-140%',
    },
    '@media(max-width:420px)': {
      left: '-160%',
    },
    '@media(max-width:360px)': {
      left: '-140%',
    },
    right: '50%',
  },
  active: {
    '& $line': {
      backgroundColor: '#5F4EC2',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#5F4EC2',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#BDC1C6',
    borderRadius: 1,
  },
})(StepConnector)
