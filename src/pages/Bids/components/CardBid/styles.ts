import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardBid: {
      background: theme.palette.background.paper,
      padding: theme.spacing(5, 6),
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      rowGap: 20,
      flexWrap: 'wrap',
      [theme.breakpoints.down(681)]: {
        padding: theme.spacing(2.5, 3),
      },
      [theme.breakpoints.down(548)]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down(320)]: {
        padding: theme.spacing(1),
      },
    },
    cardBidImage: {
      flex: '1',
      order: 0,
      minWidth: 310,
      minHeight: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down(380)]: {
        minWidth: 280,
      },
      [theme.breakpoints.down(330)]: {
        minWidth: 250,
        minHeight: 130,
      },
      [theme.breakpoints.down(300)]: {
        minWidth: 230,
      },
    },
    image: {
      height: 150,
      backgroundSize: 'contain',
      borderRadius: 5,
      width: 'unset',
      [theme.breakpoints.down(330)]: {
        height: 130,
      },
    },
    cardBidInfo: {
      flex: '1',
      order: 1,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      rowGap: 8,
      // marginLeft: theme.spacing(6),
      [theme.breakpoints.down(550)]: {
        order: 2,
      },
    },
    cardBidBids: {
      flex: '1',
      order: 2,
      justifyContent: 'center',
      marginLeft: 'auto',
      gap: 16,
      rowGap: 16,
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down(1025)]: {
        marginLeft: 0,
      },
      [theme.breakpoints.down(550)]: {
        order: 1,
      },
    },
    cardBidAction: {
      flex: '1',
      display: 'flex',
      order: 3,
      // alignItems: 'center',
      // position: 'relative',
      minWidth: 200,
      justifyContent: 'center',
      flexDirection: 'column',
      [theme.breakpoints.down(1050)]: {
        minWidth: 160,
        justifyContent: 'flex-start',
      },
    },
    timer: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 0,
      width: 163,
      justifyContent: 'center',
      backgroundColor: theme.palette.grey['50'],
      '&.burn': {
        backgroundColor: theme.palette.info.light,
      },
    },
    bids: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
      background: theme.palette.grey['50'],
      borderRadius: theme.spacing(3),
      width: 150,
      [theme.breakpoints.down(601)]: {
        width: 147,
      },
      [theme.breakpoints.down(370)]: {
        width: 140,
      },
      [theme.breakpoints.down(350)]: {
        width: 120,
      },
      [theme.breakpoints.down(320)]: {
        width: 100,
      },
    },
    bidsAmount: {
      fontSize: 18,
      fontWeight: 700,
      margin: theme.spacing(2, 0, 1),
    },
    informerHead: {
      maxWidth: 200,
      display: 'flex',
      lineHeight: 18,
      paddingBottom: theme.spacing(5),
      gap: 6,
    },
    btnAction: {
      margin: 'auto 0',
      fontSize: 16,
      fontWeight: 700,
      // minWidth: 155,
    },
    btnView: {
      border: `2px solid ${theme.palette.text.primary}`,
    },
    btnPlaceBid: {
      color: theme.palette.white,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.main,
      },
    },
    btnClaimNFT: {
      color: theme.palette.white,
      background: theme.palette.blackDark,
      '&:hover': {
        opacity: '80%',
        background: theme.palette.blackDark,
      },
    },
  })
)
