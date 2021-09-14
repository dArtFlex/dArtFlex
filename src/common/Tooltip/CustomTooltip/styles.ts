import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customTooltip: {
      position: 'absolute',
      background: ({ background }: { background?: string }) => (background ? background : theme.palette.primary.dark),
      color: theme.palette.white,
      padding: theme.spacing(1, 2),
      borderRadius: theme.spacing(1),
      zIndex: 9999,
      opacity: 0.9,
      visibility: 'hidden',
      whiteSpace: 'nowrap',
    },
    root: {
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      '&:hover': {
        '& $customTooltip': {
          visibility: 'visible',
        },
      },
    },
  })
)
