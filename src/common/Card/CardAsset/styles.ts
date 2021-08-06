import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 325,
      boxShadow: '0px 7px 20px rgba(19, 27, 56, 0.60)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      [theme.breakpoints.down(680)]: {
        width: '88vw',
        minWidth: 'unset',
        margin: 'auto',
      },
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    artContainer: {
      height: '242px',
      width: '100%',
      color: theme.palette.blackMain,
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-around',
      cursor: 'pointer',
      '&>img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
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
      flexWrap: 'wrap',
      rowGap: 16,
      gap: 12,
      padding: theme.spacing(4, 5),
      background: theme.palette.accentGradient,
      color: theme.palette.white,
      [theme.breakpoints.down(425)]: {
        padding: theme.spacing(4, 3),
      },
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
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: '8px',
      fontSize: 18,
      lineHeight: 1.3,
      fontWeight: 600,
      width: 159,
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
    mintedBottom: {
      height: 72,
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
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
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
    blue: {
      background: theme.palette.blue,
    },
    purple: {
      background: theme.palette.purple,
    },
    borderdIconButton: {
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.text.primary,
    },
    cardImage: {
      borderRadius: 10,
    },
  })
)
