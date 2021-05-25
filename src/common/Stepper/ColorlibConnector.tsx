import { withStyles } from '@material-ui/core/styles'
import { StepConnector } from '@material-ui/core'

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: '-50%',
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
