import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiFormHelperText-contained': {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
      },
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: theme.spacing(2),
    },
    star: {
      '&::after': {
        content: "'*'",
        display: 'inline-block',
        color: theme.palette.warning.main,
      },
    },
  })
)
