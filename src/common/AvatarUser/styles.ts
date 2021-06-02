import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

type StylesConfig = {
  size: number
  fontSize: number
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 8,
      paddingBottom: theme.spacing(4),
    },
    avatar: ({ size }: StylesConfig) => ({
      width: size,
      height: size,
    }),
    userName: ({ fontSize }: StylesConfig) => ({
      fontSize: fontSize,
    }),
  })
)
