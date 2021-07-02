import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.greyPale,
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
    },
    filtersBtnActive: {
      backgroundColor: theme.palette.primary.light,
    },
    customFiltersContainer: {
      whiteSpace: 'nowrap',
    },
    hashTagBtn: {
      minWidth: 'auto',
      padding: '6px 12px',
      color: theme.palette.greyDark,
      border: `1px solid ${theme.palette.greyMid}`,
      '&+&': {
        marginLeft: '8px',
      },
    },
    hashTagBtnActive: {
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    buttomIcon: {
      marginRight: theme.spacing(1),
    },
    priceTitle: {
      marginRight: theme.spacing(2),
    },
    priceInput: {
      width: '59px',
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
        backgroundColor: theme.palette.white,
        width: theme.spacing(20),
        height: theme.spacing(12.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '50%',
        borderRadius: theme.spacing(3),
        boxShadow: '0px 7px 20px -1px rgb(19 27 56 / 6%)',
        fontWeight: 700,
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
  })
)
