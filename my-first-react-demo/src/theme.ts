import { alpha, createTheme } from '@mui/material/styles'
import type { ThemeOptions } from '@mui/material/styles'
import type { ThemeMode } from './stores/theme'

const baseTypography: ThemeOptions['typography'] = {
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
}

export const createAppTheme = (mode: ThemeMode) => {
  const isDark = mode === 'dark'
  const palette = {
    mode,
    primary: {
      main: '#ff8a1f',
      light: '#ffb35c',
      dark: '#c85c00',
    },
    secondary: isDark
      ? {
          main: '#f5f5f5',
          light: '#ffffff',
          dark: '#b9b9b9',
        }
      : {
          main: '#101418',
          light: '#2d3238',
          dark: '#050608',
        },
    background: isDark
      ? {
          default: '#050505',
          paper: 'rgba(15, 15, 18, 0.88)',
        }
      : {
          default: '#f6f2eb',
          paper: 'rgba(255, 252, 247, 0.84)',
        },
    text: isDark
      ? {
          primary: '#f5f5f5',
          secondary: '#b4b4b4',
        }
      : {
          primary: '#161616',
          secondary: '#5f646b',
        },
    divider: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(16,20,24,0.1)',
  } as const

  return createTheme({
    palette,
    shape: {
      borderRadius: 22,
    },
    typography: baseTypography,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            color: palette.text.primary,
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
            background: isDark
              ? 'radial-gradient(circle at 12% 10%, rgba(255, 138, 31, 0.22), transparent 20%), radial-gradient(circle at 84% 16%, rgba(255, 255, 255, 0.12), transparent 22%), radial-gradient(circle at 52% 72%, rgba(255, 138, 31, 0.1), transparent 30%), linear-gradient(180deg, #050505 0%, #090909 42%, #111114 100%)'
              : 'radial-gradient(circle at 14% 10%, rgba(255, 138, 31, 0.14), transparent 22%), radial-gradient(circle at 86% 12%, rgba(30, 90, 110, 0.12), transparent 20%), radial-gradient(circle at 52% 68%, rgba(255, 138, 31, 0.08), transparent 28%), linear-gradient(180deg, #fbf7f0 0%, #f4eee3 52%, #ece6dc 100%)',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            transition: 'background 220ms ease, color 220ms ease',
          },
          'body::before': {
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            backgroundImage: isDark
              ? 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
              : 'linear-gradient(rgba(30, 38, 46, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 38, 46, 0.07) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            content: '""',
            maskImage: 'linear-gradient(to bottom, #000 0%, transparent 82%)',
          },
          'body::after': {
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
            opacity: isDark ? 0.35 : 0.22,
            backgroundImage: isDark
              ? 'radial-gradient(rgba(255,138,31,0.75) 0.8px, transparent 0.8px)'
              : 'radial-gradient(rgba(255,138,31,0.58) 0.8px, transparent 0.8px)',
            backgroundSize: '20px 20px',
            mixBlendMode: isDark ? 'screen' : 'multiply',
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
            boxShadow: isDark ? '0 24px 60px rgba(0, 0, 0, 0.35)' : '0 20px 48px rgba(120, 100, 70, 0.12)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: isDark ? '0 24px 54px rgba(0, 0, 0, 0.28)' : '0 18px 44px rgba(120, 100, 70, 0.1)',
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
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.66)',
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
}
