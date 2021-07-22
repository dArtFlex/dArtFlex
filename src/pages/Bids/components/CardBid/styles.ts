import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardBid: {
      background: theme.palette.background.paper,
      padding: theme.spacing(5, 6),
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
    },
    cardBidImage: {
      // flex: '1',
      minWidth: 330,
      minHeight: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      height: 150,
      backgroundSize: 'contain',
      borderRadius: 5,
      width: 'unset',
    },
    cardBidInfo: {
      // flex: '2',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      // marginLeft: theme.spacing(6),
    },
    cardBidBids: {
      // flex: '1',
      alignSelf: 'center',
      marginLeft: 'auto',
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down(1025)]: {
        marginLeft: 0,
      },
    },
    cardBidAction: {
      // flex: '1',
      display: 'flex',
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
      backgroundColor: theme.palette.grey['50'],
      '&.burn': {
        backgroundColor: theme.palette.lightPink,
      },
    },
    bids: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
      background: theme.palette.grey['50'],
      marginRight: theme.spacing(4),
      borderRadius: theme.spacing(3),
      width: 150,
    },
    bidsAmount: {
      fontSize: 18,
      fontWeight: 700,
      margin: theme.spacing(2, 0, 1),
    },
    informerHead: {
      // position: 'absolute',
      // top: 0,
      // left: '50%',
      // transform: 'translate(-50%, 0px)',
      maxWidth: 200,
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      lineHeight: 18,
      paddingBottom: theme.spacing(5),
      gap: 6,
    },
    btnAction: {
      margin: 'auto',
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
