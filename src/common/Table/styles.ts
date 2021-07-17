import { makeStyles, createStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      position: 'relative',
      overflowY: 'auto',
      borderRadius: theme.spacing(3),
    },
    tableContainer: {
      height: '100%',
      background: theme.palette.white,
    },
    table: {
      backgroundColor: theme.palette.white,
      '& .MuiTableCell-stickyHeader': {
        backgroundColor: theme.palette.text.primary,
      },
      '& .MuiTableCell-head': {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.palette.white,
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        backgroundColor: theme.palette.grey['300'],
      },
    },
    tableRowRoot: {
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: `${theme.palette.type === 'dark' && theme.palette.background.default} !important`,
        opacity: theme.palette.type === 'dark' && '70%',
      },
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    tableCell: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 500,
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      borderBottom: 'none',
    },
    tableCellControls: {
      minWidth: 55,
      align: 'center',
    },
    tablePagination: {
      color: theme.palette.secondary.main,
    },
    tableLoader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
)
