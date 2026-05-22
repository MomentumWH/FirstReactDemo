import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import { AppBar, Box, Button, Chip, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { appRoutes } from '../../routes'
import { useAuthStore } from '../../stores/auth'
import { useThemeModeStore } from '../../stores/theme'

const navItems = appRoutes.filter((route) => route.access === 'protected' && !route.hideInNav)

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const navViewportRef = useRef<HTMLDivElement | null>(null)
  const userInfo = useAuthStore((state) => state.userInfo)
  const logout = useAuthStore((state) => state.logout)
  const mode = useThemeModeStore((state) => state.mode)
  const toggleMode = useThemeModeStore((state) => state.toggleMode)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const isDark = mode === 'dark'

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const updateScrollState = () => {
    const element = navViewportRef.current

    if (!element) {
      return
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth

    setCanScrollLeft(element.scrollLeft > 0)
    setCanScrollRight(element.scrollLeft < maxScrollLeft - 1)
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const element = navViewportRef.current

    if (!element) {
      return
    }

    element.scrollBy({
      behavior: 'smooth',
      left: direction === 'left' ? -element.clientWidth : element.clientWidth,
    })
  }

  useEffect(() => {
    const element = navViewportRef.current

    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState()
    })

    const handleNativeScroll = () => {
      updateScrollState()
    }

    resizeObserver.observe(element)
    element.addEventListener('scroll', handleNativeScroll, { passive: true })
    updateScrollState()

    return () => {
      resizeObserver.disconnect()
      element.removeEventListener('scroll', handleNativeScroll)
    }
  }, [])

  useEffect(() => {
    const element = navViewportRef.current

    if (!element) {
      return
    }

    const activeItem = element.querySelector<HTMLElement>(`[data-route-path="${location.pathname}"]`)

    activeItem?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })

    updateScrollState()
  }, [location.pathname])

  return (
    <AppBar color="transparent" position="sticky" sx={{ top: 0, pt: 2.5, px: { xs: 2, md: 4 }, zIndex: 20 }}>
      <Paper
        elevation={0}
        sx={{
          width: 'min(1680px, calc(100vw - clamp(64px, calc(4vw + 40px), 88px)))',
          mx: 'auto',
          borderRadius: 8,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: isDark ? 'rgba(12, 12, 14, 0.72)' : 'rgba(255,255,255,0.74)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: 92,
            display: 'flex',
            gap: 2.5,
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', xl: 'center' },
            flexWrap: 'wrap',
            py: 1.5,
          }}
        >
          <Box
            component={RouterLink}
            to="/home"
            sx={{ minWidth: 0, flexShrink: 0, display: 'flex', alignItems: 'center' }}
          >
            <Box
              sx={{
                display: 'grid',
                width: 54,
                height: 54,
                placeItems: 'center',
                borderRadius: 4,
                color: isDark ? '#fff' : '#101418',
                background: isDark
                  ? 'linear-gradient(135deg, #ffffff 0%, #ff8a1f 100%)'
                  : 'linear-gradient(135deg, #ffedd5 0%, #ff8a1f 100%)',
                boxShadow: isDark ? '0 16px 32px rgba(255, 138, 31, 0.26)' : '0 12px 24px rgba(255, 138, 31, 0.18)',
              }}
            >
              <DashboardRoundedIcon />
            </Box>
            <Box sx={{ minWidth: 0, display: 'inline-block', verticalAlign: 'middle', ml: 1.5 }}>
              <Typography sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>NEON ROUTER</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                {isDark ? 'Black / White / Orange Tech UI' : 'Ivory / Ink / Orange Tech UI'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flex: '1 1 820px',
              width: { xs: '100%', xl: 'auto' },
              minWidth: 0,
              flexDirection: { xs: 'column', xl: 'row' },
              gap: 1.5,
              alignItems: { xs: 'stretch', xl: 'center' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                minWidth: 0,
                width: '100%',
                alignItems: 'center',
                gap: 1,
                overflow: 'hidden',
              }}
            >
              <IconButton
                aria-label="滚动导航向左"
                disabled={!canScrollLeft}
                onClick={() => handleScroll('left')}
                sx={{
                  flex: '0 0 auto',
                  color: '#050505',
                  border: '1px solid transparent',
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                  '&.Mui-disabled': {
                    color: alpha('#050505', 0.45),
                    backgroundColor: alpha('#ff8a1f', 0.4),
                  },
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>

              <Box
                ref={navViewportRef}
                onScroll={updateScrollState}
                sx={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  display: 'flex',
                  gap: 1,
                  scrollBehavior: 'smooth',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path

                  return (
                    <Button
                      data-route-path={item.path}
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      color={isActive ? 'primary' : 'inherit'}
                      startIcon={isActive ? <AutoAwesomeRoundedIcon /> : <FiberManualRecordRoundedIcon sx={{ fontSize: 10 }} />}
                      variant={isActive ? 'contained' : 'text'}
                      sx={{
                        flex: '0 0 clamp(150px, 24vw, 210px)',
                        minWidth: '150px',
                        maxWidth: '210px',
                        justifyContent: 'center',
                        px: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        scrollSnapAlign: 'start',
                        color: isActive ? '#050505' : 'text.secondary',
                        backgroundColor: isActive ? 'primary.main' : 'transparent',
                        border: isActive ? '1px solid transparent' : `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          backgroundColor: isActive ? 'primary.light' : alpha('#ff8a1f', 0.08),
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </Box>

              <IconButton
                aria-label="滚动导航向右"
                disabled={!canScrollRight}
                onClick={() => handleScroll('right')}
                sx={{
                  flex: '0 0 auto',
                  color: '#050505',
                  border: '1px solid transparent',
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                  '&.Mui-disabled': {
                    color: alpha('#050505', 0.45),
                    backgroundColor: alpha('#ff8a1f', 0.4),
                  },
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flex: '0 0 auto',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: { xs: 'flex-end', xl: 'flex-start' },
                gap: 1,
                minWidth: 'fit-content',
              }}
            >
              <Button
                variant="text"
                startIcon={isDark ? <WbSunnyRoundedIcon /> : <BedtimeRoundedIcon />}
                onClick={toggleMode}
                sx={{
                  flexShrink: 0,
                  minWidth: 120,
                  px: 1.75,
                  color: theme.palette.text.primary,
                  border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.18 : 0.26)}`,
                  background:
                    isDark
                      ? 'linear-gradient(135deg, rgba(255,138,31,0.16) 0%, rgba(255,255,255,0.04) 100%)'
                      : 'linear-gradient(135deg, rgba(255,138,31,0.18) 0%, rgba(255,255,255,0.72) 100%)',
                  '&:hover': {
                    background:
                      isDark
                        ? 'linear-gradient(135deg, rgba(255,138,31,0.24) 0%, rgba(255,255,255,0.06) 100%)'
                        : 'linear-gradient(135deg, rgba(255,138,31,0.24) 0%, rgba(255,255,255,0.86) 100%)',
                  },
                }}
              >
                {isDark ? '白天模式' : '黑夜模式'}
              </Button>
              <Chip
                icon={<PersonRoundedIcon />}
                label={userInfo?.user || '用户'}
                sx={{
                  maxWidth: 240,
                  borderRadius: 999,
                  px: 1,
                  backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(16,20,24,0.06)',
                  '& .MuiChip-label': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
              <Button
                color="secondary"
                variant="contained"
                startIcon={<ExitToAppRoundedIcon />}
                onClick={handleLogout}
                sx={{
                  flexShrink: 0,
                  minWidth: 132,
                  px: 2.5,
                  whiteSpace: 'nowrap',
                }}
              >
                退出登录
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Paper>
    </AppBar>
  )
}

export default Navbar
