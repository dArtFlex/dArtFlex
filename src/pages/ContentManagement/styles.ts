import { makeStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentManagementWrapper: {
      padding: theme.spacing(8, 10),
    },
    tabIndicator: {
      backgroundColor: theme.palette.violet,
      width: theme.spacing(1),
      left: 0,
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
  })
)
