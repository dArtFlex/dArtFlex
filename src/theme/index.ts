import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  white: '#fff',
  ghostWhite: '#F6F8FA',
  grey3: '#828282',
  grey5: '#E0E0E0',
  accent: '#323232',
  accentOpacity: 'rgba(50,50,50, 0.1)',
} as const

type ICustomPalette = typeof palette

declare module '@material-ui/core/styles/createPalette' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends ICustomPalette {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends ICustomPalette {}
}

const md = '@media (min-width:960px)'
const sm = '@media (min-width:600px)'
const xl = '@media (min-width:1920px)'

const TextPrimary = '#222A2C'
const PrimaryMain = '#5239AE'
const PrimaryLight = '#7F82F5'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: PrimaryMain,
      light: PrimaryLight,
    },
    secondary: {
      main: palette.grey3,
    },
    text: { primary: TextPrimary },
    ...palette,
  },
  spacing: 4,
  typography: {
    htmlFontSize: 16,
    fontFamily: ['Archivo', 'sans-serif'].join(','),
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: 38,
        fontWeight: 700,
        lineHeight: 1.25,
      },
      h2: {
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 1.25,
      },
      h3: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.25,
      },
      body1: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.25,
        color: palette.grey3,
      },
    },
    MuiToolbar: {
      root: {
        minHeight: 74,
        padding: '0 40px',
        backgroundColor: palette.white,
        borderBottom: `1px solid ${palette.grey5}`,
        boxShadow: 'none',
      },
    },
    MuiIconButton: {
      root: {
        width: '40px',
        height: '40px',
        padding: '10px',
        border: `1px solid ${palette.accentOpacity}`,
        borderRadius: '12px',
      },
    },
    MuiButton: {
      root: {
        fontSize: 16,
        textTransform: 'none',
        padding: '6px 20px',
        borderRadius: '12px',
      },
      containedPrimary: {
        color: palette.white,
        background: `linear-gradient(129.22deg, ${PrimaryMain} 6.8%, ${PrimaryLight} 134.28%)`,
      },
      outlinedPrimary: {
        borderRadius: '12px',
        padding: '6px 20px',
        color: PrimaryMain,
        background: palette.white,
      },
    },
    MuiTabs: {
      flexContainer: {
        borderBottom: `1px solid ${palette.grey5}`,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        minWidth: 'none',
        padding: '6px 4px',
        margin: '0 8px',
        '&:first-child': {
          marginLeft: 0,
        },
        '&:last-child': {
          marginRight: 0,
        },
        [md]: {
          minWidth: 'none!important',
        },
        [sm]: {
          minWidth: 'none!important',
        },
      },
      textColorInherit: {
        color: palette.grey3,
        fontWeight: 600,
        opacity: 1,
        '&$selected': {
          color: palette.accent,
        },
      },
    },
    //@ts-ignore: ts error
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: palette.accent,
        height: 3,
      },
    },
    MuiAvatar: {
      root: {
        width: '24px',
        height: '24px',
        fontSize: '14px',
      },
    },
  },
})

export default theme
