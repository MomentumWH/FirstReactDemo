import type { ReactNode } from 'react'
import { Box, Card, Container, Paper, Stack, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

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
        {
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, md: 5.5 },
          border: '1px solid rgba(21, 94, 99, 0.14)',
          borderRadius: 9,
          background:
            'linear-gradient(135deg, rgba(255,252,248,0.95) 0%, rgba(248,251,252,0.96) 56%, rgba(255,244,232,0.94) 100%)',
          '&::before': {
            position: 'absolute',
            top: -80,
            right: -40,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(76, 198, 195, 0.24) 0%, transparent 68%)',
            content: '""',
          },
          '&::after': {
            position: 'absolute',
            bottom: -110,
            left: -50,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(240, 163, 87, 0.22) 0%, transparent 70%)',
            content: '""',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: side ? { xs: '1fr', md: 'minmax(0, 1fr) 360px' } : '1fr',
          gap: 3,
          alignItems: 'end',
        }}
      >
        <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              width: 'fit-content',
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              color: 'primary.dark',
              backgroundColor: alpha('#155e63', 0.08),
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
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
                  sx={{
                    p: 2.25,
                    border: '1px solid rgba(21, 94, 99, 0.12)',
                    borderRadius: 5,
                    backgroundColor: 'rgba(255,255,255,0.66)',
                    backdropFilter: 'blur(14px)',
                  }}
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
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: 3,
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.72)',
              backgroundColor: 'rgba(255,255,255,0.68)',
              boxShadow: '0 24px 48px rgba(23, 32, 51, 0.09)',
              '&::before': {
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 34%)',
                content: '""',
              },
            }}
          >
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
        {
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, md: 4.5 },
          border: '1px solid rgba(148, 163, 184, 0.16)',
          borderRadius: 7,
          backgroundColor: 'rgba(255,255,255,0.84)',
          '&::before': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, rgba(76, 198, 195, 0.4), rgba(240, 163, 87, 0.32), transparent)',
            content: '""',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack spacing={2.5}>
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
      sx={{
        height: '100%',
        border: '1px solid rgba(148, 163, 184, 0.14)',
        borderRadius: 6,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(247,251,255,0.92) 100%)',
        transition: 'transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(21, 94, 99, 0.24)',
          boxShadow: '0 28px 58px rgba(31, 36, 48, 0.12)',
        },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            width: 56,
            height: 56,
            placeItems: 'center',
            borderRadius: 3.5,
            color: 'primary.dark',
            backgroundColor: alpha('#155e63', 0.1),
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
