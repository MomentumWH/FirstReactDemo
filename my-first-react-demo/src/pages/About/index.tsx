import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded'
import RuleRoundedIcon from '@mui/icons-material/RuleRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import { Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { HeroPanel, InfoCard, PageContainer, SectionPanel } from '../../components/pageScaffold'

const techStack = [
  {
    description: '负责组件化界面与状态驱动渲染，是整个页面体验的核心运行时。',
    icon: <IntegrationInstructionsRoundedIcon />,
    title: 'React 19',
  },
  {
    description: '管理页面路由、导航状态与地址同步，让多页面结构保持清晰。',
    icon: <HubRoundedIcon />,
    title: 'React Router 6',
  },
  {
    description: '提供极速开发服务和更轻量的构建体验，适合快速迭代演示项目。',
    icon: <BoltRoundedIcon />,
    title: 'Vite',
  },
  {
    description: '为组件数据、事件与状态加上类型约束，降低后续扩展成本。',
    icon: <RuleRoundedIcon />,
    title: 'TypeScript',
  },
]

const workflow = [
  '在 App 中通过共享路由配置统一维护页面路径、组件映射和访问权限。',
  '页面优先复用同一套 MUI 布局壳与信息卡片，减少风格漂移和结构分叉。',
  '使用类型定义约束表单、列表和状态结构，让后续开发更稳定也更好维护。',
]

const About = () => {
  return (
    <PageContainer>
      <HeroPanel
        kicker="React Router Demo"
        title="关于这个重构后的示例项目"
        description="这个项目现在不只是用来演示页面切换，它已经具备了继续往真实前端原型扩展的基础条件。共享主题、导航壳、表单和卡片模块已经成型，后续加业务页面时会更顺畅。"
        side={(
          <Stack spacing={1.5}>
            <Typography color="text.secondary" sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Project Goal
            </Typography>
            <Typography variant="h5">用一套统一的 MUI 设计语言组织整个前端项目</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              重点不是堆叠组件，而是把路由、页面结构、信息密度和表单交互都放进同一套可维护的系统里。
            </Typography>
          </Stack>
        )}
      />

      <SectionPanel
        kicker="Tech Stack"
        title="技术栈"
        description="依赖保持克制，但每一层职责都足够明确，适合继续承接中小型业务页面。"
      >
        <Grid container spacing={3}>
          {techStack.map((tech) => (
            <Grid key={tech.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <InfoCard icon={tech.icon} title={tech.title} description={tech.description} />
            </Grid>
          ))}
        </Grid>
      </SectionPanel>

      <SectionPanel
        kicker="Workflow"
        title="项目组织方式"
        description="这几条原则基本决定了后续继续增加页面和功能时，项目还能否保持整洁。"
      >
        <List disablePadding>
          {workflow.map((item, index) => (
            <ListItem
              key={item}
              disableGutters
              sx={{
                alignItems: 'flex-start',
                px: 0,
                py: 1.75,
                borderBottom: index === workflow.length - 1 ? 'none' : '1px solid rgba(148, 163, 184, 0.14)',
              }}
            >
              <ListItemIcon sx={{ minWidth: 44, mt: 0.25 }}>
                <TipsAndUpdatesRoundedIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 700 }}>{`0${index + 1}`}</Typography>}
                secondary={<Typography color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.8 }}>{item}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </SectionPanel>
    </PageContainer>
  )
}

export default About
