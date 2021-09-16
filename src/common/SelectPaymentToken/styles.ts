import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      maxWidth: 600,
      padding: theme.spacing(10, 16),
      borderRadius: 12,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(8, 4),
        maxWidth: '100%',
      },
    },
    flexBox: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    iconInfo: {
      width: 20,
      height: 20,
    },
    btn: {
      color: theme.palette.text.primary,
    },
    btnForm: {
      color: theme.palette.white,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.main,
      },
    },
    iconInput: {
      width: 32,
      height: 32,
    },
    textInput: {
      fontSize: 16,
      fontWeight: 700,
    },
    input: {
      '& input': {
        fontSize: 30,
        fontWeight: 700,
        fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
      },
      '& MuiTextField-root': {
        '&:hover': {
          border: `2px solid ${theme.palette.text.primary}`,
        },
      },
      '& .MuiFormHelperText-root.Mui-error': {
        fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
      },
    },
    btnsBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    iconToken: {
      width: 40,
      height: 40,
      [theme.breakpoints.down('sm')]: {
        width: 24,
        height: 24,
      },
    },
    listTokens: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(3),
    },
    activeToken: {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    btnActiveContract: {
      background: theme.palette.primary.light,
      border: `1px solid ${theme.palette.violet}`,
      borderRadius: theme.spacing(3),
      color: theme.palette.violet,
      '&:hover': {
        background: theme.palette.primary.light,
      },
    },
    btnContract: {
      border: `1px solid ${theme.palette.greyLight}`,
      '&:hover': {
        border: `1px solid ${theme.palette.greyLight}`,
      },
    },
    helperText: {
      fontFamily: ['Roboto Mono', 'Archivo', 'sans-serif'].join(','),
      paddingRight: theme.spacing(2),
      fontSize: 16,
      fontWeight: 700,
      lineHeight: '16px',
    },
    helperTextError: {
      color: theme.palette.redMiddle,
    },
  })
)
