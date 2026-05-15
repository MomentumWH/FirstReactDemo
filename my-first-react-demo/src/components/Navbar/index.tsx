import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import { AppBar, Box, Button, Chip, Paper, Toolbar, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { appRoutes } from '../../routes'
import { useAuthStore } from '../../stores/auth'

const navItems = appRoutes.filter((route) => route.access === 'protected' && !route.hideInNav)

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userInfo = useAuthStore((state) => state.userInfo)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <AppBar color="transparent" position="sticky" sx={{ top: 0, pt: 2.5, px: { xs: 2, md: 4 }, zIndex: 20 }}>
      <Paper
        elevation={0}
        sx={{
          width: 'min(1680px, calc(100vw - clamp(64px, calc(4vw + 40px), 88px)))',
          mx: 'auto',
          borderRadius: 8,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(12, 12, 14, 0.72)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <Toolbar sx={{ minHeight: 92, display: 'flex', gap: 2.5, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box component={RouterLink} to="/home" sx={{ minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'grid',
                width: 54,
                height: 54,
                placeItems: 'center',
                borderRadius: 4,
                color: '#fff',
                background: 'linear-gradient(135deg, #ffffff 0%, #ff8a1f 100%)',
                boxShadow: '0 16px 32px rgba(255, 138, 31, 0.26)',
              }}
            >
              <DashboardRoundedIcon />
            </Box>
            <Box sx={{ minWidth: 0, display: 'inline-block', verticalAlign: 'middle', ml: 1.5 }}>
              <Typography sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>NEON ROUTER</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Black / White / Orange Tech UI
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1.25,
              alignItems: { xs: 'stretch', md: 'center' },
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path

                return (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    color={isActive ? 'primary' : 'inherit'}
                    startIcon={isActive ? <AutoAwesomeRoundedIcon /> : <FiberManualRecordRoundedIcon sx={{ fontSize: 10 }} />}
                    variant={isActive ? 'contained' : 'text'}
                    sx={{
                      px: 2.25,
                      color: isActive ? '#050505' : 'text.secondary',
                      backgroundColor: isActive ? 'primary.main' : 'transparent',
                      border: isActive ? '1px solid transparent' : `1px solid ${alpha('#ffffff', 0.08)}`,
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<PersonRoundedIcon />}
                label={userInfo?.user || '用户'}
                sx={{ borderRadius: 999, px: 1, backgroundColor: 'rgba(255,255,255,0.06)' }}
              />
              <Button
                color="secondary"
                variant="contained"
                startIcon={<ExitToAppRoundedIcon />}
                onClick={handleLogout}
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
