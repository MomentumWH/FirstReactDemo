import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { HeroPanel, InfoCard, PageContainer, SectionPanel } from '../../components/pageScaffold'

const contactMethods = [
  {
    description: 'contact@example.com',
    icon: <ContactMailRoundedIcon />,
    title: '邮箱',
  },
  {
    description: '+1 (555) 123-4567',
    icon: <PhoneRoundedIcon />,
    title: '电话',
  },
  {
    description: '北京市朝阳区科技园区',
    icon: <LocationOnRoundedIcon />,
    title: '地址',
  },
]

const servicePromises = [
  {
    description: '收到消息后尽快确认需求，并给出清晰的下一步建议与时间预期。',
    icon: <RocketLaunchRoundedIcon />,
    title: '快速响应',
  },
  {
    description: '优先理解你真正要解决的问题，而不只是对页面表面做一些局部修改。',
    icon: <PsychologyRoundedIcon />,
    title: '聚焦问题',
  },
  {
    description: '基于使用反馈持续优化页面结构、交互体验与代码质量，而不是一次性交付后停住。',
    icon: <TaskAltRoundedIcon />,
    title: '持续优化',
  },
]

const Contact = () => {
  return (
    <PageContainer>
      <HeroPanel
        kicker="Contact"
        title="有问题或想法，欢迎继续联系"
        description="如果你正在学习 React Router、TypeScript、Vite 或 MUI，这个页面可以继续扩展成真实的反馈入口。它已经具备基础动作按钮、信息卡片和服务说明区块。"
        actions={(
          <>
            <Button component="a" href="mailto:contact@example.com" variant="contained">
              发送邮件
            </Button>
            <Button component="a" href="tel:+15551234567" variant="outlined" color="secondary">
              拨打电话
            </Button>
          </>
        )}
        side={(
          <Stack spacing={1.25}>
            <Typography color="text.secondary" sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              建议附上
            </Typography>
            <Typography variant="h5">问题描述、预期效果、截图或报错信息</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              这样可以更快定位问题，也更方便从页面层面一路推进到具体实现方案。
            </Typography>
          </Stack>
        )}
      />

      <SectionPanel
        kicker="Reach Us"
        title="联系方式"
        description="这些卡片已经适合继续接入真实联系方式、工单系统或在线咨询入口。"
      >
        <Grid container spacing={3}>
          {contactMethods.map((method) => (
            <Grid key={method.title} size={{ xs: 12, md: 4 }}>
              <InfoCard icon={method.icon} title={method.title} description={method.description} />
            </Grid>
          ))}
        </Grid>
      </SectionPanel>

      <SectionPanel
        kicker="Service"
        title="我们如何处理反馈"
        description="不仅要接住消息，还要给用户明确的反馈路径和后续动作。"
      >
        <Grid container spacing={3}>
          {servicePromises.map((service) => (
            <Grid key={service.title} size={{ xs: 12, md: 4 }}>
              <InfoCard icon={service.icon} title={service.title} description={service.description} />
            </Grid>
          ))}
        </Grid>
      </SectionPanel>
    </PageContainer>
  )
}

export default Contact
