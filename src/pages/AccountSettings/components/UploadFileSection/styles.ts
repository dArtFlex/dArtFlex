import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontSize: 14,
      fontWeight: 600,
      margin: theme.spacing(0, 0, 4),
    },
    box: {
      display: 'grid',
      gridGap: theme.spacing(7),
      gridTemplateColumns: '115px 1fr',
      alignItems: 'flex-start',
      justifyContent: 'start',
    },
    image: {
      width: 115,
      height: 115,
    },
    desctiption: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.greyDark,
      margin: theme.spacing(0, 0, 4),
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-start',
      gap: theme.spacing(3),
    },
    uploadBtn: {
      lineHeight: '21.6px',
      border: `2px solid ${theme.palette.text.primary}`,
    },
    deleteBtn: {
      lineHeight: '21.6px',
      color: theme.palette.greyDark,
    },
    avatar: {
      '& img': {
        width: 115,
        height: 115,
        borderRadius: '50%',
        alignSelf: 'flex-start',
      },
    },
    cover: {
      '& img': {
        width: 115,
        height: 50,
        objectFit: 'cover',
        borderRadius: 4,
        alignSelf: 'flex-start',
      },
    },
  })
)
