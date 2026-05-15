import { alpha, createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#ff8a1f',
      light: '#ffb35c',
      dark: '#c85c00',
    },
    secondary: {
      main: '#f5f5f5',
      light: '#ffffff',
      dark: '#b9b9b9',
    },
    background: {
      default: '#050505',
      paper: 'rgba(15, 15, 18, 0.88)',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b4b4b4',
    },
  },
  shape: {
    borderRadius: 22,
  },
  typography: {
    fontFamily: [
      '"Space Grotesk"',
      '"IBM Plex Sans"',
      '"Hiragino Sans GB"',
      '"Microsoft YaHei"',
      '"PingFang SC"',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: ['"Space Grotesk"', '"IBM Plex Sans"', 'sans-serif'].join(','),
      fontWeight: 700,
      letterSpacing: '-0.05em',
      lineHeight: 1.02,
    },
    h2: {
      fontFamily: ['"Space Grotesk"', '"IBM Plex Sans"', 'sans-serif'].join(','),
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.06,
    },
    h3: {
      fontFamily: ['"Space Grotesk"', '"IBM Plex Sans"', 'sans-serif'].join(','),
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
          color: '#f5f5f5',
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
            'radial-gradient(circle at 12% 10%, rgba(255, 138, 31, 0.22), transparent 20%), radial-gradient(circle at 84% 16%, rgba(255, 255, 255, 0.12), transparent 22%), radial-gradient(circle at 52% 72%, rgba(255, 138, 31, 0.1), transparent 30%), linear-gradient(180deg, #050505 0%, #090909 42%, #111114 100%)',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        },
        'body::before': {
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          content: '""',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 82%)',
        },
        'body::after': {
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.35,
          backgroundImage: 'radial-gradient(rgba(255,138,31,0.75) 0.8px, transparent 0.8px)',
          backgroundSize: '20px 20px',
          mixBlendMode: 'screen',
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
          backgroundColor: alpha('#ff8a1f', 0.28),
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
          border: '1px solid transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(18px)',
          backgroundImage: 'none',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 24px 54px rgba(0, 0, 0, 0.28)',
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
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
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
