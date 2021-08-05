import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.grey['50'],
      [theme.breakpoints.down(640)]: {
        padding: theme.spacing(4),
      },
    },
    menuTitle: {
      padding: theme.spacing(2, 4, 2, 7.5),
      outline: 'none',
      pointerEvents: 'none',
    },
    filtersBtn: {
      minWidth: '122px',
      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    filtersBtnActive: {
      backgroundColor: theme.palette.background.paper,
    },
    customFiltersContainer: {
      // whiteSpace: 'nowrap',
      flexWrap: 'wrap',
      rowGap: 10,
    },
    hashTagContainer: {
      flex: '1 1 auto',
      marginRight: theme.spacing(10),
      [theme.breakpoints.between(320, 1025)]: {
        width: '100%',
        marginBottom: theme.spacing(4),
      },
    },
    hotOnlyBtn: {
      marginLeft: theme.spacing(11),
      [theme.breakpoints.between(461, 1025)]: {
        marginLeft: 'auto',
      },
      [theme.breakpoints.down(461)]: {
        marginLeft: 0,
      },
    },
    hashTagBtn: {
      minWidth: 'auto',
      padding: '6px 12px',
      color: theme.palette.text.secondary,
      border: `1px solid ${theme.palette.greyMid}`,
      '&+&': {
        marginLeft: '8px',
      },
    },
    hashTagBtnActive: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: '#8566FF1A',
      color: theme.palette.primary.main,
    },
    buttomIcon: {
      marginRight: theme.spacing(1),
    },
    priceTitle: {
      marginRight: theme.spacing(2),
    },
    priceInput: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 12,
      width: 120,
      [theme.breakpoints.down(425)]: {
        width: 100,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
    priceInputBorder: {
      border: `1px solid ${theme.palette.grey['200']}`,
    },
    inputAdorment: {
      fontSize: '16px',
      fontWeight: 600,
      color: theme.palette.greyMid,
    },
    burnLabel: {
      color: theme.palette.warning.main,
      fontSize: 16,
      display: 'flex',
      alignItems: 'center',
      '&>svg': {
        marginRight: theme.spacing(1),
      },
    },
    grid: {
      display: 'grid',
      gridGap: theme.spacing(6),
      gridTemplateColumns: 'repeat(auto-fill, minmax(322px, 1fr))',
    },
    promotionBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: `${theme.spacing(15, 0, 15, 0)}`,
      [theme.breakpoints.down(1024)]: {
        padding: `${theme.spacing(8, 0)}`,
        flexDirection: 'column',
        height: 900,
        marginBottom: theme.spacing(6),
        justifyContent: 'space-between',
      },
      [theme.breakpoints.down(841)]: {
        height: 800,
      },
      [theme.breakpoints.down(481)]: {
        height: 900,
      },
    },
    promotionPhoto: {
      maxHeight: 575,
      maxWidth: 700,
      color: theme.palette.blackMain,
      display: 'flex',
      justifyContent: 'space-around',
      '&>img': {
        maxWidth: '100%',
        maxHeight: 'inherit',
        objectFit: 'contain',
        borderRadius: 10,
      },
      [theme.breakpoints.down(1024)]: {
        maxHeight: 500,
        maxWidth: 800,
      },
      [theme.breakpoints.down(841)]: {
        maxWidth: 600,
        maxHeight: 450,
      },
      [theme.breakpoints.down(681)]: {
        maxWidth: 540,
        maxHeight: 450,
      },
      [theme.breakpoints.down(521)]: {
        maxHeight: 400,
      },
    },
    sliderNext: {
      maxHeight: 930,
      '&.swiper-button-next, .swiper-button-prev': {
        width: '20px',
        height: '20px',
      },
      '&.swiper-button-next': {
        right: 0,
      },
      '&>div': {
        alignItems: 'center',
      },
      '--swiper-theme-color': theme.palette.text.primary,
    },
    promotionAuthorAva: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: theme.spacing(8),
      height: theme.spacing(8),
      borderRadius: '100%',
      marginRight: theme.spacing(2),
    },
    promotionTextSecondary: {
      color: theme.palette.text.secondary,
    },
    promotionCardName: {
      [theme.breakpoints.down(601)]: {
        textAlign: 'center',
        overflowWrap: 'anywhere',
      },
    },
    promotionInfoText: {
      fontSize: 24,
      fontWeight: 700,
      minWidth: 190,
      marginTop: theme.spacing(3),
      [theme.breakpoints.down(481)]: {
        alignItems: 'center',
      },
    },
    promotionTimer: {
      backgroundColor: theme.palette.background.paper,
    },
    promotionInfo: {
      width: '100%',
      display: 'flex',
      gap: 20,
      rowGap: 20,
      justifyContent: 'space-between',

      gridGap: theme.spacing(5),
      [theme.breakpoints.down(481)]: {
        flexDirection: 'column',
      },
    },
    promotionButtons: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      gap: theme.spacing(5),
      rowGap: 20,
      marginTop: theme.spacing(6),
      [theme.breakpoints.down(601)]: {
        width: '100%',
      },
      [theme.breakpoints.down(481)]: {
        flexDirection: 'column',
      },
      '&>button': {
        width: '100%',
      },
    },
    promotionInfoWrapper: {
      marginLeft: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.down(1025)]: {
        marginLeft: theme.spacing(4),
        marginTop: theme.spacing(4),
      },
      [theme.breakpoints.down(481)]: {
        alignItems: 'center',
        width: '96%',
        marginLeft: 0,
      },
    },
    promotionInfoBox: {
      [theme.breakpoints.down(481)]: {
        textAlign: 'center',
      },
    },
    promotionSlide: {
      height: 380,
      maxWidth: 440,
    },
    promotionButtonWhite: {
      border: `${theme.spacing(0.5)}px solid ${theme.palette.text.primary}`,
      fontWeight: 'bold',
    },
    promotionButtonContained: {
      background: theme.palette.accentGradient,
      fontWeight: 'bold',
      color: theme.palette.white,
    },
    sortArtworksMenu: {
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
      },
      [theme.breakpoints.down(560)]: {
        overflow: 'scroll',
      },
    },
    sortButtons: {
      margin: theme.spacing(4, 0, 6, 0),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
    },
    toggleButtonSelected: {
      backgroundColor: `${theme.palette.text.primary} !important`,
      color: `${theme.palette.background.paper} !important`,
    },
    toggleButton: {
      whiteSpace: 'nowrap',
      [theme.breakpoints.down(680)]: {
        padding: theme.spacing(1, 2),
      },
    },

    sortItem: {
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' && theme.palette.blackDark,
      },
    },
    filterDivider: {
      backgroundColor: theme.palette.text.secondary,
    },
    paginationWrapper: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      width: 'fit-content',
      borderRadius: 12,
      border: `2px solid ${theme.palette.text.secondary}`,
      padding: theme.spacing(0, 2),
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'space-between',
    },
    leftArrow: {
      cursor: 'pointer',
      marginRight: theme.spacing(1),
    },
    rightArrow: {
      cursor: 'pointer',
      marginLeft: theme.spacing(1),
    },
  })
)
