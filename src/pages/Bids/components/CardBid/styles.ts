import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardBid: {
      background: theme.palette.white,
      padding: theme.spacing(5, 6),
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      flexWrap: 'wrap',
    },
    cardBidImage: {
      flex: '1',
      minWidth: 150,
      minHeight: 150,
    },
    image: {
      height: 150,
      backgroundSize: 'contain',
      borderRadius: 5,
    },
    cardBidInfo: {
      flex: '2',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    cardBidBids: {
      flex: '1',
      alignSelf: 'center',
      display: 'flex',
      gap: 16,
    },
    cardBidAction: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      minWidth: 200,
    },
    timer: {
      backgroundColor: theme.palette.greyPale,
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
      background: theme.palette.greyPale,
      borderRadius: theme.spacing(3),
    },
    bidsAmount: {
      fontSize: 18,
      fontWeight: 700,
      margin: theme.spacing(2, 0, 1),
    },
    informerHead: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, 0px)',
      maxWidth: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: 18,
      paddingBottom: theme.spacing(5),
      gap: 6,
    },
    btnAction: {
      margin: 'auto',
      fontSize: 16,
      fontWeight: 700,
      minWidth: 155,
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
    btnClaneNFT: {
      color: theme.palette.white,
      background: theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.text.primary,
      },
    },
  })
)
