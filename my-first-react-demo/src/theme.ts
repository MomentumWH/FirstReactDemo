import { alpha, createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#155e63',
      light: '#4cc6c3',
      dark: '#103b45',
    },
    secondary: {
      main: '#c86b2a',
      light: '#f0a357',
      dark: '#8f3d18',
    },
    background: {
      default: '#f4ede2',
      paper: 'rgba(255, 250, 244, 0.84)',
    },
    text: {
      primary: '#1f2430',
      secondary: '#5c6270',
    },
  },
  shape: {
    borderRadius: 26,
  },
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      '"Hiragino Sans GB"',
      '"Microsoft YaHei"',
      '"PingFang SC"',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: ['"Source Han Serif SC"', '"Songti SC"', 'Georgia', 'serif'].join(','),
      fontWeight: 700,
      letterSpacing: '-0.05em',
      lineHeight: 1.02,
    },
    h2: {
      fontFamily: ['"Source Han Serif SC"', '"Songti SC"', 'Georgia', 'serif'].join(','),
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.06,
    },
    h3: {
      fontFamily: ['"Source Han Serif SC"', '"Songti SC"', 'Georgia', 'serif'].join(','),
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    body1: {
      lineHeight: 1.75,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          color: '#1f2430',
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          minWidth: '320px',
          minHeight: '100%',
        },
        body: {
          minWidth: '320px',
          minHeight: '100vh',
          margin: 0,
          background:
            'radial-gradient(circle at 12% 10%, rgba(44, 165, 160, 0.18), transparent 22%), radial-gradient(circle at 84% 16%, rgba(232, 154, 89, 0.18), transparent 24%), radial-gradient(circle at 52% 72%, rgba(34, 83, 120, 0.08), transparent 30%), linear-gradient(180deg, #fcf8f2 0%, #f3e8d8 48%, #edf3f8 100%)',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        },
        'body::before': {
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(17, 79, 87, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 79, 87, 0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          content: '""',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
        },
        'body::after': {
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.3,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.68) 0.7px, transparent 0.7px)',
          backgroundSize: '18px 18px',
          mixBlendMode: 'soft-light',
          content: '""',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        '#root': {
          minHeight: '100vh',
        },
        '::selection': {
          backgroundColor: alpha('#155e63', 0.2),
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 46,
          borderRadius: 999,
          paddingInline: 20,
          letterSpacing: '-0.01em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(18px)',
          backgroundImage: 'none',
          boxShadow: '0 24px 60px rgba(31, 36, 48, 0.09)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 24px 54px rgba(31, 36, 48, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          letterSpacing: '0.02em',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: 'rgba(255, 251, 247, 0.84)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
})
