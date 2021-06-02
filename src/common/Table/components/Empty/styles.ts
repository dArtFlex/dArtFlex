import { makeStyles, createStyles } from '@material-ui/core'

export const useStyles = makeStyles(() =>
  createStyles({
    empty: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
)
