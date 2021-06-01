import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardImage: {
      position: 'relative',
      minWidth: 322,
      minHeight: 322,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    cardImageCheckbox: {
      position: 'absolute',
      background: theme.palette.white,
      top: 12,
      left: 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      '& .MuiFormControlLabel-root': {
        marginLeft: 0,
      },
    },
  })
)
