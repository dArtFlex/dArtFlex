import { withStyles } from '@material-ui/core/styles'
import { StepConnector } from '@material-ui/core'

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: '-50%',
    '@media(max-width:680px)': {
      left: '-70%',
    },
    '@media(max-width:560px)': {
      left: '-90%',
    },
    '@media(max-width:520px)': {
      left: '-110%',
    },
    '@media(max-width:480px)': {
      left: '-130%',
    },
    '@media(max-width:440px)': {
      left: '-150%',
    },
    '@media(max-width:410px)': {
      left: '-160%',
    },
    '@media(max-width:380px)': {
      left: '-155wv',
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
