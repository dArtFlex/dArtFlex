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
      gridTemplateColumns: 'repeat(auto-fit, 325px)',
    },
  })
)
