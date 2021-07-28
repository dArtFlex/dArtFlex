import { makeStyles, TableRow, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentManagementWrapper: {
      padding: theme.spacing(8, 10),
      backgroundColor: theme.palette.grey['50'],
      [theme.breakpoints.down(961)]: {
        padding: theme.spacing(4, 5),
      },
    },
    managementWrapperSmall: {
      padding: theme.spacing(0, 5),
      width: '80%',
      [theme.breakpoints.down(961)]: {
        width: '100%',
        padding: 0,
      },
    },
    tabsRoot: {
      overflow: 'scroll',
    },
    tabIndicator: {
      backgroundColor: theme.palette.primary.main,
      width: theme.spacing(1),
      left: 0,
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'row',
      rowGap: 16,
      marginTop: theme.spacing(8),
      [theme.breakpoints.down(961)]: {
        flexDirection: 'column',
      },
    },
    toggleButtons: {
      backgroundColor: theme.palette.background.paper,
    },
    toggleButtonSelected: {
      backgroundColor: `${theme.palette.text.primary} !important`,
      color: `${theme.palette.background.paper} !important`,
    },
    sortStatusMenu: {
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    sortItem: {
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' && theme.palette.blackDark,
      },
    },
    toggleButton: {
      padding: theme.spacing(1.25, 5),
    },
    tabWrapperRoot: {
      height: 'fit-content',
      width: 'fit-content',
      [theme.breakpoints.down(420)]: {
        width: '100%',
      },
    },
    tabWrapper: {
      padding: theme.spacing(6, 7.5),
      [theme.breakpoints.down(1025)]: {
        padding: theme.spacing(6, 4),
      },
      [theme.breakpoints.down(961)]: {
        padding: theme.spacing(2),
        overflow: 'unset !important',
      },
    },
    flexContainer: {
      borderBottom: 'none',
    },
    tabRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'baseline',
      margin: 0,
      whiteSpace: 'nowrap',
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
      [theme.breakpoints.down(1025)]: {
        padding: theme.spacing(0, 2),
      },
      [theme.breakpoints.down(961)]: {
        padding: 0,
      },
    },
    textSecondary: {
      fontSize: 18,
      color: theme.palette.greyDark,
    },
    formField: {
      backgroundColor: theme.palette.background.paper,
      width: theme.spacing(82),
      marginLeft: theme.spacing(3),
      [theme.breakpoints.down(1025)]: {
        width: 280,
      },
      [theme.breakpoints.down(680)]: {
        width: '100%',
        marginLeft: 0,
      },
    },
    NFTCard: {
      [theme.breakpoints.up(680)]: {
        marginLeft: theme.spacing(5),
      },
    },
    borderedInput: {
      border: `1px solid ${theme.palette.greyMid}`,
    },
    mobileEditableNFT: {
      flexDirection: 'column',
      alignItems: 'flex-start !important',
      rowGap: 16,
      '&>div:first-child': {
        margin: '0 auto',
      },
    },
    NFTPhoto: {
      backgroundSize: '100% 100%',
      width: theme.spacing(22),
      height: theme.spacing(20.5),
      borderRadius: theme.spacing(1.5),
      [theme.breakpoints.down(480)]: {
        width: 68,
        height: 62,
      },
    },
    NFTWrapper: {
      padding: theme.spacing(3, 6),
      width: theme.spacing(165),
      [theme.breakpoints.down(1025)]: {
        width: 580,
      },
      [theme.breakpoints.down(680)]: {
        padding: theme.spacing(3),
        width: '90vw',
      },
    },
    NFTName: {
      fontWeight: 700,
      marginLeft: theme.spacing(4.5),
      fontSize: 16,
      overflow: 'hidden',
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
    nftCountInfo: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(7),
      [theme.breakpoints.down(961)]: {
        marginLeft: theme.spacing(2),
      },
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
      '& svg': {
        fill: theme.palette.text.primary,
      },
    },
    listItem: {
      '&:hover': {
        borderRadius: theme.spacing(4),
        backgroundColor: theme.palette.type === 'dark' && theme.palette.accent,
        [theme.breakpoints.down(960)]: {
          backgroundColor: 'unset',
        },
      },
      [theme.breakpoints.down(961)]: {
        paddingLeft: 0,
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
      backgroundColor: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.blackLight,
      color: theme.palette.white,
      borderBottom: 'none',
    },
    tableCellRoot: {
      [theme.breakpoints.down(1025)]: {
        padding: theme.spacing(3),
      },
      [theme.breakpoints.down(641)]: {
        padding: theme.spacing(2),
      },
    },
    photoWrapper: {
      minWidth: 100,
      textAlign: 'center',
    },
    tableTextItem: {
      fontSize: '1rem',
      fontWeight: 400,
      color: theme.palette.lightViolet,
      minWidth: 100,
    },
    statusTextActive: {
      fontSize: '1rem',
      color: theme.palette.text.primary,
    },
    userStatus: {
      minWidth: 90,
    },
    statusTextBanned: {
      fontSize: '1rem',
      color: theme.palette.redMiddle,
    },
    worksRowActionButton: {
      minWidth: 96,
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
    flexBoxInit: {
      display: 'flex',
      alignItems: 'center',
    },
    flexBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      rowGap: 16,
      gap: 16,
    },
    paginationWrapper: {
      width: 'fit-content',
    },
    paginationContent: {
      justifyContent: 'center',
    },
    disabledButton: {
      color: theme.palette.text.primary,

      '&:disabled': {
        opacity: '35%',
      },
    },
    dropDownLabel: {
      marginLeft: theme.spacing(8),
    },
    sortDropDown: {
      [theme.breakpoints.up(640)]: {
        marginLeft: 'auto',
      },
    },
    searchInput: {
      backgroundColor: theme.palette.background.paper,
    },
    userAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      backgroundSize: 'cover',
      borderRadius: '100%',
      marginRight: theme.spacing(6),
    },
    addNFTButton: {
      [theme.breakpoints.up(960)]: {
        margin: theme.spacing(6, 0, 0, 6),
      },
    },
    actionButtonsContainer: {
      margin: '0 auto',
    },
  })
)

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)
