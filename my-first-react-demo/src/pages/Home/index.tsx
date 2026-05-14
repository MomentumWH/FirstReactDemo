import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded'
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded'
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { HeroPanel, InfoCard, PageContainer, SectionPanel } from '../../components/pageScaffold'

const metrics = [
  { label: 'Core Pages', value: '首页、关于、联系页已经统一为同一套视觉与布局语言。' },
  { label: 'Design System', value: 'MUI 主题、卡片、导航与表单样式现在共享同一个设计基线。' },
  { label: 'Build Flow', value: '保持 Vite 的快速开发体验，同时让项目更像可继续扩展的业务原型。' },
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
  '共享主题变量和玻璃化卡片层级',
  '懒加载路由与更稳定的页面节奏',
  '更适合继续承接真实表单与接口请求',
]

const Home = () => {
  return (
    <PageContainer>
      <HeroPanel
        kicker="Welcome"
        title="把 React 路由示例打磨成更像产品原型的界面"
        description="这一版首页不再只是演示页面跳转，而是把视觉层级、布局节奏和信息模块都拉齐到同一个体系里。你可以从这里继续加业务页面、数据面板、表单流程和接口状态。"
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
            <Typography variant="h5">统一 UI、收紧结构、保留真实扩展空间</Typography>
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
                    borderRadius: 3.5,
                    border: '1px solid rgba(21, 94, 99, 0.1)',
                    backgroundColor: 'rgba(255,255,255,0.74)',
                  }}
                >
                  <BoltRoundedIcon color="secondary" fontSize="small" />
                  <Typography sx={{ fontWeight: 700 }}>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      />

      <SectionPanel
        kicker="Highlights"
        title="功能亮点"
        description="这一组模块说明项目现在已经从基础示例页升级到更适合承接真实业务原型的前端骨架。"
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
        title="当前这套页面适合继续往哪里扩展"
        description="如果你打算继续做成练手项目或者简化的业务后台，下面这些方向可以直接接上。"
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={2}>
              <Typography color="text.secondary">
                现在的结构已经把导航、内容容器、表单样式和页面节奏收束到统一系统里，因此继续加用户中心、设置面板、数据列表或者媒体模块时，不需要再反复重写基础样式。
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
                borderRadius: 5,
                border: '1px solid rgba(148, 163, 184, 0.16)',
                background: 'linear-gradient(160deg, rgba(20, 58, 77, 0.96) 0%, rgba(21, 94, 99, 0.9) 54%, rgba(200, 107, 42, 0.92) 100%)',
                color: '#fff',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.86 }}>
                Design Snapshot
              </Typography>
              <Typography variant="h5" sx={{ mt: 1.5, maxWidth: 320 }}>
                温暖、清晰、有编辑感的产品展示层
              </Typography>
              <Typography sx={{ mt: 1.5, lineHeight: 1.85, color: 'rgba(255,255,255,0.78)' }}>
                这套风格的重点不是花哨，而是让视觉语言更完整，用户一眼就能分清导航、内容、状态和下一步动作。
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </SectionPanel>
    </PageContainer>
  )
}

export default Home
