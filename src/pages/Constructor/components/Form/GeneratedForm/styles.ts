import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    generatedContainer: {
      flex: '1 1 auto',
      display: 'grid',
      gridGap: 40,
      alignItems: 'start',
      justifyContent: 'center',
      gridTemplateRows: 'minmax(100%, auto)',
      gridTemplateColumns: '777px 1fr',
    },
    imageBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.grey['500'],
      padding: theme.spacing(20, 3),
      borderRadius: 12,
    },
    image: {
      width: 463,
      height: 463,
      borderRadius: 12,
      objectFit: 'cover',
    },
    genetatedForm: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      maxWidth: 325,
      color: theme.palette.text.primary,
    },
    btnBack: {
      alignSelf: 'flex-start',
    },
    btnDownload: {
      background: theme.palette.text.primary,
      color: theme.palette.background.default,
      marginBottom: theme.spacing(6),
      '&:hover': {
        background: theme.palette.text.primary,
      },
      '&:disabled': {
        color: theme.palette.background.default,
        background: theme.palette.greyMid,
      },
    },
    btnSecondaryGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 20,
    },
    btnSecondary: {
      maxWidth: 153,
      flex: 1,
      border: `2px solid ${theme.palette.text.primary}`,
      padding: theme.spacing(3.5),
      whiteSpace: 'nowrap',
    },
  })
)
