import type { ReactNode } from 'react'
import { Box, Card, Container, Paper, Stack, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

const PANEL_RADIUS = { xs: '24px', md: '32px' }
const HERO_RADIUS = { xs: '28px', md: '36px' }
const CARD_RADIUS = { xs: '22px', md: '28px' }
const COMPACT_CARD_RADIUS = { xs: '18px', md: '22px' }

type MetricItem = {
  label: string
  value: string
}

type PageContainerProps = {
  children: ReactNode
}

type HeroPanelProps = {
  actions?: ReactNode
  className?: string
  description: ReactNode
  kicker: string
  metrics?: MetricItem[]
  side?: ReactNode
  sx?: SxProps<Theme>
  title: string
}

type SectionPanelProps = {
  children: ReactNode
  className?: string
  description?: ReactNode
  kicker: string
  sx?: SxProps<Theme>
  title: string
}

type InfoCardProps = {
  description: ReactNode
  icon: ReactNode
  title: string
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: 'min(1680px, calc(100vw - clamp(64px, calc(4vw + 40px), 88px)))',
        mx: 'auto',
        py: { xs: 3, md: 4.5 },
      }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>{children}</Stack>
    </Container>
  )
}

export const HeroPanel = ({
  actions,
  className,
  description,
  kicker,
  metrics,
  side,
  sx,
  title,
}: HeroPanelProps) => {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={[
        (theme) => ({
          position: 'relative',
          overflow: 'visible',
          p: { xs: 3.5, md: 6.5 },
          border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
          borderRadius: HERO_RADIUS,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(9,9,10,0.94) 0%, rgba(15,15,18,0.96) 58%, rgba(31,18,10,0.94) 100%)'
              : 'linear-gradient(135deg, rgba(255,250,244,0.96) 0%, rgba(252,247,240,0.96) 55%, rgba(245,234,220,0.98) 100%)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        aria-hidden="true"
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            '&::before': {
              position: 'absolute',
              top: -70,
              right: -30,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 138, 31, 0.22) 0%, transparent 68%)',
              content: '""',
            },
            '&::after': {
              position: 'absolute',
              bottom: -120,
              left: -60,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background:
                theme.palette.mode === 'dark'
                  ? 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 72%)'
                  : 'radial-gradient(circle, rgba(31, 57, 77, 0.08) 0%, transparent 72%)',
              content: '""',
            },
          })}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: side ? { xs: '1fr', md: 'minmax(0, 1fr) 360px' } : '1fr',
          gap: { xs: 2.5, md: 3.5 },
          alignItems: 'end',
        }}
      >
        <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              width: 'fit-content',
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              color: 'primary.dark',
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha('#155e63', 0.08)
                  : alpha('#ff8a1f', 0.12),
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            })}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'secondary.main',
                boxShadow: `0 0 0 6px ${alpha('#c86b2a', 0.12)}`,
              }}
            />
            {kicker}
          </Box>

          <div>
            <Typography variant="h1" sx={{ maxWidth: 760, fontSize: { xs: '2.7rem', md: '4.6rem' } }}>
              {title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 760, fontSize: 17, lineHeight: 1.9 }}>
              {description}
            </Typography>
          </div>

          {actions ? <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>{actions}</Stack> : null}

          {metrics?.length ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: `repeat(${metrics.length}, minmax(0, 1fr))` },
                gap: 1.5,
              }}
            >
              {metrics.map((metric) => (
                <Card
                  elevation={0}
                  key={metric.label}
                  sx={(theme) => ({
                    p: 2.25,
                    border: `1px solid ${alpha('#155e63', theme.palette.mode === 'dark' ? 0.12 : 0.18)}`,
                    borderRadius: COMPACT_CARD_RADIUS,
                    backgroundColor:
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.66)' : 'rgba(255,255,255,0.86)',
                    backdropFilter: 'blur(14px)',
                  })}
                >
                  <Typography color="primary.dark" sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {metric.label}
                  </Typography>
                  <Typography sx={{ mt: 1.25, color: 'text.primary', fontSize: 16, fontWeight: 700, lineHeight: 1.6 }}>
                    {metric.value}
                  </Typography>
                </Card>
              ))}
            </Box>
          ) : null}
        </Stack>

        {side ? (
          <Paper
            elevation={0}
            sx={(theme) => ({
              position: 'relative',
              overflow: 'visible',
              p: { xs: 2.5, md: 3.5 },
              borderRadius: CARD_RADIUS,
              border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(22,28,34,0.08)',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)',
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 24px 48px rgba(0, 0, 0, 0.34)'
                  : '0 18px 40px rgba(130, 110, 80, 0.12)',
            })}
          >
            <Box
              aria-hidden="true"
              sx={(theme) => ({
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                borderRadius: 'inherit',
                pointerEvents: 'none',
                '&::before': {
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(255,138,31,0.16) 0%, rgba(255,255,255,0) 36%)',
                  content: '""',
                },
                ...(theme.palette.mode === 'light'
                  ? {
                      '&::after': {
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 54%)',
                        content: '""',
                      },
                    }
                  : {}),
              })}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>{side}</Box>
          </Paper>
        ) : null}
      </Box>
    </Paper>
  )
}

export const SectionPanel = ({ children, className, description, kicker, sx, title }: SectionPanelProps) => {
  return (
    <Paper
      className={className}
      elevation={0}
      sx={[
          (theme) => ({
            position: 'relative',
            overflow: 'visible',
            p: { xs: 3.25, md: 5 },
            border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(16,20,24,0.08)',
            borderRadius: PANEL_RADIUS,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.72)',
          }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        aria-hidden="true"
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            '&::before': {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, rgba(255, 138, 31, 0.6), rgba(255, 255, 255, 0.18), transparent)'
                  : 'linear-gradient(90deg, rgba(255, 138, 31, 0.56), rgba(16, 20, 24, 0.1), transparent)',
              content: '""',
            },
          })}
      />
      <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
        <div>
          <Typography color="primary.dark" sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {kicker}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: { xs: '2rem', md: '2.7rem' }, fontWeight: 700, letterSpacing: '-0.04em' }}>
            {title}
          </Typography>
          {description ? (
            <Typography color="text.secondary" sx={{ mt: 1.25, maxWidth: 760, lineHeight: 1.8 }}>
              {description}
            </Typography>
          ) : null}
        </div>
        {children}
      </Stack>
    </Paper>
  )
}

export const InfoCard = ({ description, icon, title }: InfoCardProps) => {
  return (
      <Card
      elevation={0}
        sx={(theme) => ({
          height: '100%',
          border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(16,20,24,0.08)',
          borderRadius: CARD_RADIUS,
          background:
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(247,241,233,0.76) 100%)',
          transition: 'transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(255, 138, 31, 0.3)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 28px 58px rgba(0, 0, 0, 0.32)'
                : '0 24px 48px rgba(130, 110, 80, 0.16)',
          },
        })}
      >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            width: 56,
            height: 56,
            placeItems: 'center',
            borderRadius: '16px',
            color: '#ff8a1f',
            backgroundColor: alpha('#ff8a1f', 0.14),
            border: '1px solid rgba(255, 138, 31, 0.14)',
          }}
        >
          {icon}
        </Box>
        <div>
          <Typography variant="h6">{title}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
            {description}
          </Typography>
        </div>
      </Stack>
    </Card>
  )
}
