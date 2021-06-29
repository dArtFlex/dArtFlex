import { makeStyles, TableCell, TableRow, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentManagementWrapper: {
      padding: theme.spacing(8, 10),
      backgroundColor: theme.palette.greyLight,
    },
    managementWrapperSmall: {
      padding: theme.spacing(0, 5),
      width: '80%',
    },
    tabIndicator: {
      backgroundColor: theme.palette.violet,
      width: theme.spacing(1),
      left: 0,
    },
    toggleButton: {
      padding: theme.spacing(1.25, 5),
    },
    tabWrapperRoot: {
      height: 'fit-content',
    },
    tabWrapper: {
      padding: theme.spacing(6, 7.5),
    },
    flexContainer: {
      borderBottom: 'none',
    },
    tabRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'baseline',
      margin: 0,
    },
    tabButton: {
      width: 'unset',
      fontSize: 16,
      fontWeight: 700,
    },
    textColorPrimary: {
      color: theme.palette.text.primary,
    },
    managementWrapper: {
      padding: theme.spacing(0, 18),
    },
    textSecondary: {
      fontSize: 18,
      color: theme.palette.greyDark,
    },
    NFTPhoto: {
      backgroundSize: '100% 100%',
      width: theme.spacing(22),
      height: theme.spacing(20.5),
      borderRadius: theme.spacing(1.5),
    },
    NFTWrapper: {
      padding: theme.spacing(3, 6),
      width: theme.spacing(165),
    },
    NFTName: {
      fontWeight: 700,
      marginLeft: theme.spacing(4.5),
      fontSize: 16,
    },
    NFTLink: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.greyDark,
      marginLeft: theme.spacing(4.5),
    },
    EditIcon: {
      color: theme.palette.text.primary,
      marginLeft: 'auto',
    },
    DeleteIcon: {
      color: theme.palette.text.primary,
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
    },
    addNFTIcon: {
      color: theme.palette.text.primary,
      display: 'flex',
      alignItems: 'center',
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: 700,
    },
    NFTInputBox: {
      padding: theme.spacing(3.5, 4),
      borderRadius: theme.spacing(3),
      width: theme.spacing(82),
      border: `1px solid ${theme.palette.greyMid}`,
      marginLeft: theme.spacing(3),
    },
    CheckedIcon: {
      color: theme.palette.green,
      border: `1px solid ${theme.palette.greyMid}`,
      marginLeft: 'auto',
    },
    CloseIcon: {
      border: `1px solid ${theme.palette.greyMid}`,
      color: theme.palette.redMiddle,
      marginLeft: theme.spacing(4),
    },
    dragIcon: {
      cursor: 'drag',
    },
    listItem: {
      '&:hover': {
        borderRadius: theme.spacing(4),
      },
    },
    photo: {
      height: theme.spacing(10),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      maxWidth: theme.spacing(13),
    },
    tableHeadCell: {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.white,
      borderBottom: 'none',
    },
    photoWrapper: {
      width: theme.spacing(25),
      textAlign: 'center',
    },
    tableTextItem: {
      fontSize: '1rem',
      fontWeight: 400,
      color: theme.palette.lightViolet,
    },
    statusTextActive: {
      fontSize: '1rem',
      color: theme.palette.text.primary,
    },
    statusTextBanned: {
      fontSize: '1rem',
      color: theme.palette.redMiddle,
    },
    statusTextUnban: {
      fontSize: '1rem',
      color: theme.palette.green,
      fontWeight: 700,
    },
    arrowRight: {
      color: theme.palette.text.primary,
    },
    paginationText: {
      margin: theme.spacing(0, 4),
      width: theme.spacing(10),
      textAlign: 'center',
    },
    flexBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paginationWrapper: {
      width: 'fit-content',
    },
    disabledButton: {
      '&:disabled': {
        opacity: '35%',
      },
    },
    dropDownLabel: {
      marginLeft: theme.spacing(8),
    },
    sortDropDown: {
      marginLeft: 'auto',
    },
    searchInput: {
      marginLeft: theme.spacing(4),
    },
    userAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      backgroundSize: 'cover',
      borderRadius: '100%',
      marginRight: theme.spacing(6),
    },
  })
)

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.greyPale,
    },
  },
}))(TableRow)
