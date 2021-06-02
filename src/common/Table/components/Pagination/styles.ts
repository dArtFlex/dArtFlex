import { makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: 50,
    '& .MuiIconButton-root': {
      padding: theme.spacing(1),
      margin: theme.spacing(0, 1),
      '& svg': {
        width: 24,
        height: 24,
      },
    },
  },
  input: {
    width: 60,
    height: 32,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 500,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.white,
    border: '1px solid transparent',
    outline: 0,
    borderRadius: 2,
    boxShadow: '0 2px 15px 0 rgba(132, 132, 132, 0.08)',
    padding: 12,
    marginRight: 15,
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  currentPage: {
    width: 32,
    height: 32,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: '20px',
    fontWeight: 500,
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    margin: theme.spacing(0, 3),
  },
}))
