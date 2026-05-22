import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import App from './App'
import './index.css'
import { createAppTheme } from './theme'
import { useThemeModeStore } from './stores/theme'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root was not found')
}

const AppThemeProvider = () => {
  const mode = useThemeModeStore((state) => state.mode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

createRoot(rootElement).render(
  <StrictMode>
    <AppThemeProvider />
  </StrictMode>,
)
