import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  white: '#fff',
  ghostWhite: '#F6F8FA', //artwork details img bg
  greyLight: '#E8ECEE', // secondary color, header border-bottom, outlined select border, button secondary, divider
  grey3: '#828282',
  grey5: '#E0E0E0',
  greyPale: '#F8F8F9', // artworks grid bg, iconButton border,
  graySoft: '#F2F4F5', // artworks search input bg,
  greyMid: '#BDC1C6', //hashtag botton border, price input adorment
  greyDark: '#7E8387', //text secondary, select dd title
  accent: '#323232',
  spanishGray: '#979797',
  green: '#0DBF69',
  yellowLight: '#FFF6DB',
  yellow: '#F2C94C',
  redMiddle: '#EB5757', //disconnect
  violet: '#5F4EC2',
  accentGradient: 'linear-gradient(129.22deg, #5239AE 6.8%, #7F82F5 134.28%)',
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
const PrimaryLight = '#EEEBF7'

const lightPalette = {
  type: 'light',
  primary: {
    main: PrimaryMain,
    light: PrimaryLight,
  },
  secondary: {
    main: palette.greyLight,
  },
  warning: { main: '#FF5C00' },
  text: { primary: TextPrimary, secondary: palette.greyDark },
  background: {
    default: '#fff',
    paper: '#fff',
  },
  ...palette,
}

const DarkPalette = {
  type: 'dark',
  primary: {
    main: PrimaryMain,
    light: PrimaryLight,
  },
  text: { primary: '#fff', secondary: '#e7e7e7' },
  background: {
    default: TextPrimary,
    paper: TextPrimary,
  },
  ...palette,
}

const theme = {
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
        fontSize: 21,
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.25,
      },
      body1: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.25,
      },
    },
    MuiToolbar: {
      root: {
        minHeight: 74,
        padding: '0 40px',
        boxShadow: 'none',
      },
    },
    MuiIconButton: {
      root: {
        width: '40px',
        height: '40px',
        padding: '10px',
        borderRadius: '12px',
      },
    },
    MuiButton: {
      root: {
        fontSize: 16,
        fontWeight: 600,
        textTransform: 'none',
        padding: '10px 20px',
        borderRadius: '12px',
      },
      outlined: {
        padding: '9px 20px',
      },
      containedPrimary: {
        color: palette.white,
        background: palette.accentGradient,
      },
      outlinedPrimary: {
        color: PrimaryMain,
        background: palette.white,
      },
      outlinedSecondary: {
        color: TextPrimary,
        backgroundColor: palette.white,
        border: `1px solid ${palette.greyLight}`,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: palette.greyLight,
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
    MuiFormControl: {
      root: {
        backgroundColor: palette.white,
        borderRadius: '12px',
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '12px',
      },
      input: {
        padding: '14.5px 14px',
      },
      '&$focused $notchedOutline': {
        borderRadius: '12px',
      },
      notchedOutline: {
        borderColor: palette.greyLight,
      },
    },
    MuiSelect: {
      select: {
        fontWeight: 600,
        '&:focus': {
          borderRadius: '12px',
          backgroundColor: palette.white,
        },
      },
    },
    MuiListItem: {
      root: {
        outline: 'none',
        '&:hover': {
          backgroundColor: PrimaryLight,
          cursor: 'pointer',
        },
        '&$disabled': {
          backgroundColor: 'transparent!important',
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '10px',
      },
      elevation1: {
        boxShadow: '0px 7px 20px rgba(19, 27, 56, 0.06)',
      },
      elevation8: {
        boxShadow: '0px 14px 21px -1px rgba(31, 35, 51, 0.27)',
        border: `1px solid ${palette.greyPale}`,
      },
    },
    //@ts-ignore: muilab component
    MuiToggleButtonGroup: {
      root: {
        padding: 4,
        background: '#fff',
        borderRadius: 10,
      },
    },
    MuiToggleButton: {
      root: {
        fontSize: 16,
        fontWeight: 600,
        borderRadius: '7px!important',
        padding: '4px 12px',
        textTransform: 'none',
        border: 'none',
        color: palette.greyDark,
        '&$selected': {
          backgroundColor: TextPrimary,
          color: palette.white,
          '&:hover': {
            backgroundColor: TextPrimary,
          },
        },
      },
    },
  },
}

export { theme, lightPalette, DarkPalette }
