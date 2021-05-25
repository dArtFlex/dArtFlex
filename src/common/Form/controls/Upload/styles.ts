import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadBtn: {
      lineHeight: '21.6px',
      border: `2px solid ${theme.palette.text.primary}`,
    },
  })
)
