import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.grey['50'],
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
      whiteSpace: 'nowrap',
      flexWrap: 'wrap',
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
      [theme.breakpoints.between(320, 1025)]: {
        marginLeft: 'auto',
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(325px, 1fr))',
    },
    promotionBox: {
      display: 'flex',
      justifyContent: 'center',
      padding: `${theme.spacing(15, 0, 15, 0)}`,
      height: theme.spacing(112),
      '@media (min-width:1025px)': {
        height: theme.spacing(135),
      },
      [theme.breakpoints.down(1024)]: {
        display: 'grid',
        height: 'unset',
        marginBottom: theme.spacing(6),
      },
    },
    promotionPhoto: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: theme.spacing(1.5),
    },
    sliderNext: {
      '&.swiper-button-next, .swiper-button-prev': {
        width: '20px',
        height: '20px',
      },
      '--swiper-navigation-size': '32px',
      '--swiper-theme-color': theme.palette.text.primary,
      '&.swiper-pagination, .swiper-pagination-fraction': {
        display: 'flex',
        backgroundColor: theme.palette.background.default,
        width: theme.spacing(20),
        height: theme.spacing(12.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '50%',
        borderRadius: theme.spacing(3),
        boxShadow: '0px 7px 20px -1px rgb(19 27 56 / 6%)',
        fontWeight: 700,
        border: `2px solid ${theme.palette.text.secondary}`,
        [theme.breakpoints.down(1024)]: {
          marginLeft: '45%',
        },
      },
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
    promotionInfoText: {
      fontSize: 24,
      fontWeight: 700,
      minWidth: 190,
      marginTop: theme.spacing(3),
    },
    promotionInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: theme.spacing(5),
    },
    promotionButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: theme.spacing(5),
      marginTop: theme.spacing(6),
    },
    promotionInfoWrapper: {
      marginLeft: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '@media (min-width:1025px)': {
        marginLeft: theme.spacing(40),
      },
      [theme.breakpoints.down(1024)]: {
        marginLeft: 'unset',
        marginTop: theme.spacing(4),
      },
    },
    promotionSlide: {
      height: theme.spacing(76),
      width: theme.spacing(110),
      '@media (min-width:1025px)': {
        height: theme.spacing(95),
        width: theme.spacing(137),
      },
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
    },
    toggleButtonSelected: {
      backgroundColor: `${theme.palette.text.primary} !important`,
      color: `${theme.palette.background.paper} !important`,
    },
    sortItem: {
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' && theme.palette.blackDark,
      },
    },
    filterDivider: {
      backgroundColor: theme.palette.text.secondary,
    },
  })
)
