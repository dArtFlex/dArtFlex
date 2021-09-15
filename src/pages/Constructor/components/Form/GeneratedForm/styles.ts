import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    generatedContainer: {
      flex: '1 1 auto',
      display: 'grid',
      gridGap: 40,
      alignItems: 'start',
      justifyContent: 'center',
      gridTemplateColumns: 'repeat(2, 1fr)',
      [theme.breakpoints.down(900)]: {
        gridTemplateColumns: 'auto',
      },
    },
    imageBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: theme.palette.grey['500'],
      padding: theme.spacing(20, 3),
      borderRadius: 12,
      [theme.breakpoints.down(900)]: {
        gridRow: 2,
      },
    },
    image: {
      width: 463,
      height: 463,
      borderRadius: 12,
      objectFit: 'cover',
      [theme.breakpoints.down(640)]: {
        width: '90vw',
        height: '90vw',
      },
    },
    genetatedForm: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      maxWidth: 325,
      color: theme.palette.text.primary,
      [theme.breakpoints.down(900)]: {
        gridRow: 1,
      },
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
      [theme.breakpoints.down(480)]: {
        gap: 8,
      },
    },
    btnSecondary: {
      maxWidth: 153,
      flex: 1,
      border: `2px solid ${theme.palette.text.primary}`,
      padding: theme.spacing(3.5),
      whiteSpace: 'nowrap',
      [theme.breakpoints.down(480)]: {
        maxWidth: 142,
        padding: theme.spacing(2),
      },
    },
    preloaderText: {
      fontSize: 18,
      padding: theme.spacing(7),
    },
  })
)
