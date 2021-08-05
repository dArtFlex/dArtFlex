import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      minWidth: 188,
    },
    rootAutocomplete: {
      padding: theme.spacing(0),
      backgroundColor: theme.palette.background.paper,
      '&.MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        padding: theme.spacing(0),
      },
      '& #autocomplete': {
        padding: theme.spacing(3.75, 4.5),
      },
      '& .MuiAutocomplete-endAdornment': {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
      },
    },
    select: {
      backgroundColor: theme.palette.background.paper,
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: theme.spacing(2),
    },
    star: {
      '&::after': {
        content: "'*'",
        display: 'inline-block',
        color: theme.palette.warning.main,
      },
    },
    chipsWrapper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      rowGap: 4,
    },
    chip: {
      margin: theme.spacing(0.5),
      backgroundColor: theme.palette.primary.main,
      width: 'fit-content',
    },
    hiddenInputChips: {
      '& .MuiChip-root': {
        display: 'none',
      },
    },
  })
)
