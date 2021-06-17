import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageBox: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 8,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 5,
      objectFit: 'cover',
    },
    btnCancelBid: {
      maxHeight: 38,
      border: `2px solid ${theme.palette.text.primary}`,
    },
    btnLink: {
      fill: theme.palette.text.primary,
    },
  })
)
