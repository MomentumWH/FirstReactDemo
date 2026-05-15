import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded'
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { HeroPanel, InfoCard, PageContainer, SectionPanel } from '../../components/pageScaffold'

const metrics = [
  { label: 'Core Pages', value: '首页、关于、联系页已接入统一的黑白橙科技视觉。' },
  { label: 'Design System', value: '主题、导航、卡片与表单都沿用同一套高对比界面语言。' },
  { label: 'Build Flow', value: '保留 Vite 的快速迭代，同时把页面质感拉向更炫酷的终端风格。' },
]

const features = [
  {
    description: '使用 React Router 6 管理页面切换，并保持地址栏、导航状态和内容节奏同步。',
    icon: <AccountTreeRoundedIcon />,
    title: '路由导航',
  },
  {
    description: '统一渐变、间距、阴影和响应式布局，让示例项目从 Demo 感走向产品感。',
    icon: <AutoAwesomeRoundedIcon />,
    title: '现代界面',
  },
  {
    description: '把页面壳、卡片、表单和模块化内容整合到一套可复用结构中，后续扩展更稳。',
    icon: <WidgetsRoundedIcon />,
    title: '组件拆分',
  },
]

const highlights = [
  '高对比黑底与橙色能量光',
  '玻璃面板、网格纹理与发光边框',
  '适合继续承接真实业务与数据看板',
]

const Home = () => {
  return (
    <PageContainer>
      <HeroPanel
        kicker="Welcome"
        title="把 React 路由示例改造成黑白橙科技中控台"
        description="这一版首页不再只是演示跳转，而是把层级、节奏、发光边界和信息模块统一成更有未来感的界面系统。"
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
            <Typography variant="h5">统一黑白橙基调，强化终端级视觉冲击</Typography>
            <Stack spacing={1.25}>
              {['Global Theme', 'Shared Layout', 'Editorial Hero', 'Typed State'].map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    px: 1.75,
                    py: 1.4,
                    borderRadius: 3,
                    border: '1px solid rgba(255, 138, 31, 0.16)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  }}
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
        description="这组模块把页面直接推向更像科幻产品原型的方向。"
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
        description="如果你要继续做成真实后台，这些方向可以直接接上。"
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={2}>
              <Typography color="text.secondary">
                现在的结构已经把导航、内容容器、表单样式和节奏统一到一套高对比系统里，继续加用户中心、设置面板、数据列表或者监控模块时，视觉语言都能保持一致。
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
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                border: '1px solid rgba(255, 138, 31, 0.2)',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(18,18,20,0.92) 52%, rgba(255,138,31,0.16) 100%)',
                color: '#fff',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.86 }}>
                Design Snapshot
              </Typography>
              <Typography variant="h5" sx={{ mt: 1.5, maxWidth: 320 }}>
                黑底、白字、橙色能量边缘
              </Typography>
              <Typography sx={{ mt: 1.5, lineHeight: 1.85, color: 'rgba(255,255,255,0.78)' }}>
                目标不是堆特效，而是用更强的对比、光晕和结构秩序做出更有科技感的页面。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </SectionPanel>
    </PageContainer>
  )
}

export default Home
