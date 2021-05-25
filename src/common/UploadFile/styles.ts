import { makeStyles, createStyles } from '@material-ui/core'

export const useStyles = makeStyles(() =>
  createStyles({
    attachFile: {
      display: 'inline-block',
      '& svg': {
        width: 18,
        height: 18,
      },
      '& .MuiIconButton-colorPrimary:hover': {
        backgroundColor: 'transparent',
      },
    },
    attachFileInput: {
      display: 'none',
    },
    attachLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 1.54,
      textDecoration: 'underline',
    },
    icon: {
      padding: 7,
    },
  })
)
