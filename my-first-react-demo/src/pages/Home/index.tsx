import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded'
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { HeroPanel, InfoCard, PageContainer, SectionPanel } from '../../components/pageScaffold'

const metrics = [
  { label: 'Core Pages', value: '首页、关于、联系页已经接入统一的视觉系统。' },
  { label: 'Design System', value: '主题、导航、卡片与表单都共用一套设计语言。' },
  { label: 'Build Flow', value: '保留 Vite 的开发效率，同时让界面从 Demo 感走向产品感。' },
]

const features = [
  {
    description: '用 React Router 统一管理页面切换，保持地址栏、导航状态和内容视图同步。',
    icon: <AccountTreeRoundedIcon />,
    title: '路由导航',
  },
  {
    description: '统一渐变、间距、阴影和响应式布局，让示例项目也有完整的视觉秩序。',
    icon: <AutoAwesomeRoundedIcon />,
    title: '现代界面',
  },
  {
    description: '把页面壳层、卡片、表单和信息模块整理成可复用结构，后续扩展更稳定。',
    icon: <WidgetsRoundedIcon />,
    title: '组件拆分',
  },
]

const highlights = [
  '高对比主视觉与橙色能量点缀',
  '玻璃面板、网格纹理与发光边界',
  '适合继续承接真实业务与数据展示',
]

const Home = () => {
  return (
    <PageContainer>
      <HeroPanel
        kicker="Welcome"
        title="把 React 路由示例升级成完整的科技风界面"
        description="这个首页不只是页面跳转入口，而是把层级、节奏、发光边界和信息模块统一成一套更完整的前端展示系统。"
        metrics={metrics}
        actions={(
          <>
            <Button endIcon={<ArrowOutwardRoundedIcon />} variant="contained">
              继续浏览页面
            </Button>
            <Button color="secondary" variant="outlined">
              查看设计方向
            </Button>
          </>
        )}
        side={(
          <Stack spacing={2.25}>
            <Typography color="text.secondary" sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Current Focus
            </Typography>
            <Typography variant="h5">统一主题壳层，强化终端级视觉秩序</Typography>
            <Stack spacing={1.25}>
              {['Global Theme', 'Shared Layout', 'Editorial Hero', 'Typed State'].map((item) => (
                <Box
                  key={item}
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    px: 1.75,
                    py: 1.4,
                    borderRadius: '18px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                    background:
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
                        : 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,248,240,0.76) 100%)',
                  })}
                >
                  <BoltRoundedIcon color="primary" fontSize="small" />
                  <Typography sx={{ fontWeight: 700 }}>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      />

      <SectionPanel
        kicker="Highlights"
        title="核心亮点"
        description="这组模块把页面直接推进到更像产品原型的方向。"
      >
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
              <InfoCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Grid>
          ))}
        </Grid>
      </SectionPanel>

      <SectionPanel
        kicker="Momentum"
        title="下一步可以接入什么"
        description="如果你要继续往真实后台方向扩展，这些模块已经能承接更多业务内容。"
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={2}>
              <Typography color="text.secondary">
                现在的结构已经把导航、内容容器、表单样式和信息层级统一到一套共享系统里，
                后续加入用户中心、设置页、数据列表或监控面板时，视觉语言都能保持一致。
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {highlights.map((item) => (
                  <Chip
                    key={item}
                    color="primary"
                    icon={<FlashOnRoundedIcon />}
                    label={item}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box
              sx={(theme) => ({
                p: 3,
                height: '100%',
                borderRadius: { xs: '22px', md: '28px' },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(18,18,20,0.92) 52%, rgba(255,138,31,0.16) 100%)'
                    : 'linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(248,243,235,0.94) 52%, rgba(255,138,31,0.12) 100%)',
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
              })}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.86 }}>
                Design Snapshot
              </Typography>
              <Typography variant="h5" sx={{ mt: 1.5, maxWidth: 320 }}>
                统一的界面骨架与可扩展的视觉语言
              </Typography>
              <Typography
                sx={(theme) => ({
                  mt: 1.5,
                  lineHeight: 1.85,
                  color:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.78)'
                      : alpha(theme.palette.text.primary, 0.74),
                })}
              >
                目标不是堆叠特效，而是用更稳定的对比、层次和节奏，让页面在黑夜与白天模式下都保持一致的产品质感。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </SectionPanel>
    </PageContainer>
  )
}

export default Home
