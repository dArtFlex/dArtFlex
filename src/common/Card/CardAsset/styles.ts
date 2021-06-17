import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    artContainer: {
      position: 'relative',
      padding: theme.spacing(1),
      height: '242px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      cursor: 'pointer',
      '&>img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      },
    },
    artInfoContainer: {
      height: '130px',
      padding: theme.spacing(4, 6),
    },
    avatar: {
      marginRight: theme.spacing(2),
      width: '32px',
      height: '32px',
    },
    cardAction: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      background: theme.palette.accentGradient,
      color: theme.palette.white,
    },
    cardActionNotMet: {
      background: 'transparent',
      color: theme.palette.text.secondary,
    },
    cardActionSold: {
      background: theme.palette.greyDark,
    },
    actionBtn: {
      padding: theme.spacing(2, 3),
      backgroundColor: theme.palette.white,
      color: theme.palette.text.primary,
      borderRadius: '8px',
      fontSize: 18,
      lineHeight: 1.3,
      fontWeight: 600,
    },
    actionBtnBurn: {
      color: theme.palette.warning.main,
    },
    actionBtnIcon: {
      margin: theme.spacing(0, 2, 0, 1),
    },
    actionBtnBox: {
      padding: theme.spacing(0, 6, 6),
    },
    listBtn: {
      background: theme.palette.text.primary,
      color: theme.palette.background.default,
      '&:hover': {
        background: theme.palette.text.primary,
      },
    },
    collectedBoxBtn: {
      display: 'grid',
      gridGap: theme.spacing(6),
      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    },
    collectedBtn: {
      border: `2px solid ${theme.palette.text.primary}`,
    },
    badgeBox: {
      position: 'absolute',
      right: 12,
      top: 12,
      display: 'flex',
      gap: theme.spacing(3.5),
      alignItems: 'center',
      padding: theme.spacing(3),
      background: theme.palette.background.default,
      borderRadius: '50% / 100%',
    },
    badgeIcon: {
      width: 11,
      height: 11,
      borderRadius: '50%',
      background: theme.palette.text.primary,
    },
    yellow: {
      background: theme.palette.yellow,
    },
    green: {
      background: theme.palette.green,
    },
    red: {
      background: theme.palette.warning.main,
    },
    borderdIconButton: {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
  })
)
