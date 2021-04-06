import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  gray90: '#e5e5e5',
} as const

type ICustomPalette = typeof palette

declare module '@material-ui/core/styles/createPalette' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends ICustomPalette {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends ICustomPalette {}
}

const TextPrimary = '#495D59'
const PrimaryMain = '#48c2a9'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: PrimaryMain,
      light: 'rgba(72, 194, 169, 0.2)',
    },
    text: { primary: TextPrimary },
    ...palette,
  },
  spacing: 4,
  typography: {
    htmlFontSize: 16,
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: 21,
        fontWeight: 600,
        lineHeight: 1.24,
      },
      h2: {
        fontSize: 21,
        fontWeight: 500,
        lineHeight: 1.22,
      },
      h3: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.21,
      },
    },
    MuiIconButton: {
      root: {
        padding: '8px',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: '20px',
      },
      containedPrimary: {
        color: '#fff',
      },
    },
    MuiListItem: {
      root: {
        borderRadius: '10px',
        paddingTop: '6px',
        paddingBottom: '6px',
        margin: '10px 0',
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        minWidth: '32px',
      },
    },
    MuiPaper: {
      elevation3: {
        border: '1px solid rgba(73, 93, 89, 0.1)',
        boxShadow: '0px 0px 20px rgba(114, 136, 130, 0.15)',
        borderRadius: 10,
      },
    },
    //@ts-ignore: muilab component
    MuiToggleButtonGroup: {
      root: {
        padding: 2,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0px 0px 20px rgba(114, 136, 130, 0.15)',
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: '5px!important',
        padding: 2,
        textTransform: 'none',
        border: 'none',
        color: TextPrimary,
        '&$selected': {
          backgroundColor: PrimaryMain,
        },
      },
    },
  },
})

export default theme
