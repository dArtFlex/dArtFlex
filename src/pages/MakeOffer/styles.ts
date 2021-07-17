import { makeStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 440px',
      gridTemplateRows: 'minmax(100%, auto)',
      gridGap: theme.spacing(10),
      alignItems: 'start',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
      },
    },
    previewContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.grey['100'],
      borderRadius: theme.spacing(3),
      minHeight: 680,
      '&>img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      },
    },
    expandBtb: {
      position: 'absolute',
      bottom: theme.spacing(6),
      right: theme.spacing(6),
    },
    borderdIconButton: {
      border: `1px solid ${theme.palette.greyPale}`,
    },
    offerPhoto: {
      height: 520,
    },
    flexBox: {
      display: 'flex',
      alignItems: 'center',
    },
    gridBox: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    spaceContent: {
      justifyContent: 'space-between',
    },
    moreIcon: {
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.text.primary,
    },
    textSecondary: {
      color: theme.palette.text.secondary,
    },
    artworkInfoWrapper: {
      paddingTop: theme.spacing(14),
    },
    makeOfferBlock: {
      marginTop: theme.spacing(6),
    },
    makeOfferBlockContent: {
      marginTop: theme.spacing(3),
    },
    tabsTextColor: {
      '&.Mui-selected': {
        color: theme.palette.text.primary,
      },
    },
    userAvatar: {
      height: 24,
      width: 24,
      borderRadius: '100%',
      marginRight: theme.spacing(2),
    },
    userHistoryAvatar: {
      height: 40,
      width: 40,
      borderRadius: '100%',
      marginRight: theme.spacing(2),
    },
    userAboutAvatar: {
      height: 64,
      width: 64,
      borderRadius: '100%',
      marginRight: theme.spacing(6),
    },
    textPrimary: {
      color: theme.palette.text.primary,
      fontWeight: 400,
    },
    formConfirmOffer: {
      margin: 'auto 0',
    },
    formConfirmOfferWrapper: {
      backgroundColor: theme.palette.grey['500'],
      borderRadius: 12,
      padding: theme.spacing(8, 6, 6, 6),
      margin: 'auto 0',
    },
    infoIcon: {
      color: theme.palette.text.primary,
      marginLeft: theme.spacing(2.5),
    },
    textBold: {
      fontSize: 16,
      fontWeight: 700,
    },
    descriptionText: {
      fontSize: 16,
      fontWeight: 400,
      marginTop: theme.spacing(4),
    },
    historyCardWrapper: {
      backgroundColor: theme.palette.grey['500'],
      padding: theme.spacing(3.5, 4),
      borderRadius: 12,
      marginTop: theme.spacing(4),
    },
    textViolet: {
      color: theme.palette.lightViolet,
    },
    externalIcon: {
      backgroundColor: theme.palette.white,
      border: `1px solid ${theme.palette.greyLight}`,
      marginLeft: 'auto',
      color: theme.palette.text.primary,
    },
    backIcon: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.greyLight}`,
      color: theme.palette.text.primary,
      marginRight: theme.spacing(4),
    },
    expirationInfo: {
      borderTop: `1px solid ${theme.palette.greyMid}`,
      padding: theme.spacing(1, 0),
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(11),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textError: {
      color: theme.palette.redMiddle,
    },
    aboutCreatorWrapper: {
      marginTop: theme.spacing(6),
    },
    creatorInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    makeOfferInput: {
      backgroundColor: theme.palette.background.default,
      marginTop: theme.spacing(6),
      height: 62,
      fontSize: 30,
      fontWeight: 600,
    },
    adornmentText: {
      fontSize: 30,
      fontWeight: 500,
      color: theme.palette.greyMid,
    },
    focusedInput: {
      boxShadow: '0px 7px 12px -5px rgba(84, 61, 178, 0.72)',
    },
    dropDownLabel: {
      marginLeft: theme.spacing(8),
    },
    selectPopover: {
      position: 'relative',
      width: 'fit-content',
      marginTop: theme.spacing(12),
    },
    dateSelect: {
      marginTop: theme.spacing(2),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    datePickerWrapper: {
      marginRight: theme.spacing(5),
    },
    timePickerWrapper: {
      padding: theme.spacing(2, 2),
    },
    timePicker: {
      '& div': {
        '&.MuiInput-underline:before': {
          borderBottom: 'none',
        },
      },
    },
    rulesBox: {
      marginTop: theme.spacing(4),
      display: 'flex',
    },
    checkBox: {
      padding: 0,
      marginRight: theme.spacing(3),
      display: 'flex',
      alignItems: 'baseline',
      width: 'fit-content',
      height: 'fit-content',
    },
    bottomInfoText: {
      marginTop: theme.spacing(4),
      color: theme.palette.greyDark,
    },
    authorizeFormWrapper: {
      backgroundColor: theme.palette.ghostWhite,
      padding: theme.spacing(10, 6, 17, 7),
      borderRadius: 12,
      margin: 'auto 0',
    },
    submittedFormWrapper: {
      backgroundColor: theme.palette.ghostWhite,
      padding: theme.spacing(10, 6),
      borderRadius: 12,
      margin: 'auto 0',
    },
    spinner: {
      marginTop: theme.spacing(6),
    },
    etherScanIcon: {
      marginRight: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  })
)
