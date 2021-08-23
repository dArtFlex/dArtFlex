import { createStyles, makeStyles } from '@material-ui/core/styles'
import { unset } from 'lodash'

export const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      minWidth: 188,
    },
    select: {
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : 'unset',
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    inputLabel: {},
  })
)
