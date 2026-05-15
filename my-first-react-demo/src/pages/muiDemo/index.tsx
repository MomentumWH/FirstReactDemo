import { useState } from 'react'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { HeroPanel, PageContainer, SectionPanel } from '../../components/pageScaffold'

type LaunchStatus = 'Draft' | 'Review' | 'Ready'

type ChecklistRow = {
  label: string
  owner: string
  progress: number
  status: LaunchStatus
}

const checklist: ChecklistRow[] = [
  { label: '主题定制', owner: 'UI', progress: 92, status: 'Ready' },
  { label: '表单联调', owner: 'FE', progress: 76, status: 'Review' },
  { label: '反馈体验', owner: 'UX', progress: 48, status: 'Draft' },
]

const statusTone: Record<LaunchStatus, 'default' | 'warning' | 'success'> = {
  Draft: 'default',
  Review: 'warning',
  Ready: 'success',
}

const featureCards = [
  {
    title: 'ThemeProvider',
    description: '统一颜色、圆角、字重和组件默认行为，让整套页面语气保持一致。',
    icon: <AutoAwesomeRoundedIcon fontSize="small" />,
  },
  {
    title: 'Layout + Surface',
    description: '用 Container、Grid、Paper 和 Card 重新组织页面层级，保持强对比结构。',
    icon: <InsightsRoundedIcon fontSize="small" />,
  },
  {
    title: 'Form + Feedback',
    description: '把 TextField、Dialog、Snackbar 和表格放进同一套高密度交互语境里。',
    icon: <RocketLaunchRoundedIcon fontSize="small" />,
  },
]

const checklistCompletion = checklist.reduce((sum, item) => sum + item.progress, 0) / checklist.length

const MUIDemo = () => {
  const [formData, setFormData] = useState({
    projectName: 'Marketing Console',
    category: 'dashboard',
    notifyTeam: true,
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <PageContainer>
        <HeroPanel
          kicker="MUI Demo"
          title="把 MUI 基础组件统一进同一套黑白橙界面语言"
          description="这个 demo 不再展示默认样式，而是把按钮、表单、弹窗、表格和反馈统一到和首页一致的科技中控台语气里。"
          metrics={[
            { label: 'Theme', value: '颜色、圆角、阴影与间距已同步到全局视觉系统。' },
            { label: 'Layout', value: '页面结构按 Hero / Section 的节奏重新组织。' },
            { label: 'Feedback', value: 'Dialog、Snackbar 与表格状态保留真实交互能力。' },
          ]}
          actions={(
            <>
              <Button variant="contained" onClick={() => setDialogOpen(true)}>
                查看提交流程
              </Button>
              <Button color="secondary" variant="outlined" onClick={() => setSnackbarOpen(true)}>
                触发消息提示
              </Button>
            </>
          )}
          side={(
            <Stack spacing={1.5}>
              <Typography color="text.secondary" sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Board Status
              </Typography>
              <Typography variant="h5">组件层级、表单和反馈已经对齐到同一风格</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                这页保留最常见的 MUI 用法，但把呈现方式切到更像真实后台的高对比模式。
              </Typography>
              <LinearProgress color="secondary" value={checklistCompletion} variant="determinate" sx={{ height: 10, borderRadius: 999 }} />
              <Typography color="text.secondary">
                当前模板完成度 {Math.round(checklistCompletion)}%
              </Typography>
            </Stack>
          )}
        />

        <SectionPanel
          kicker="Components"
          title="基础组件卡片"
          description="这里把最常用的组合方式以统一卡片风格重新展示。"
        >
          <Grid container spacing={3}>
            {featureCards.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 3,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 42, height: 42 }}>{item.icon}</Avatar>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                        {item.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionPanel>

        <SectionPanel
          kicker="Flow"
          title="表单、弹窗与数据"
          description="同一页面里把输入、确认和列表三类核心交互串起来。"
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 3,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                }}
              >
                <CardContent>
                  <Stack spacing={2.5}>
                    <div>
                      <Typography variant="h5">Create Starter Task</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                        用最常见的 MUI 表单组件拼出一个干净的任务录入面板。
                      </Typography>
                    </div>

                    <TextField
                      label="Project Name"
                      value={formData.projectName}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          projectName: event.target.value,
                        }))
                      }
                    />

                    <TextField
                      select
                      label="Category"
                      value={formData.category}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                    >
                      <MenuItem value="dashboard">Dashboard</MenuItem>
                      <MenuItem value="form">Form</MenuItem>
                      <MenuItem value="detail">Detail</MenuItem>
                    </TextField>

                    <FormControlLabel
                      control={(
                        <Switch
                          checked={formData.notifyTeam}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              notifyTeam: event.target.checked,
                            }))
                          }
                        />
                      )}
                      label="提交后通知协作成员"
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button variant="contained" onClick={() => setDialogOpen(true)}>
                    打开确认弹窗
                  </Button>
                  <Button variant="text" onClick={() => setSnackbarOpen(true)}>
                    模拟保存
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 7 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 3,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <div>
                      <Typography variant="h5">数据列表模板</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                        适合继续扩展成管理后台里的任务、项目或审批列表。
                      </Typography>
                    </div>

                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>模块</TableCell>
                          <TableCell>负责人</TableCell>
                          <TableCell align="right">进度</TableCell>
                          <TableCell align="right">状态</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {checklist.map((row) => (
                          <TableRow key={row.label} hover>
                            <TableCell>{row.label}</TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell align="right">{row.progress}%</TableCell>
                            <TableCell align="right">
                              <Chip
                                color={statusTone[row.status]}
                                label={row.status}
                                size="small"
                                variant={row.status === 'Draft' ? 'outlined' : 'filled'}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </SectionPanel>
      </PageContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>组件库的典型使用流程</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.25}>
            <Typography>1. 安装 `@mui/material`、`@emotion/react`、`@emotion/styled`。</Typography>
            <Typography>2. 在入口挂 `ThemeProvider` 和 `CssBaseline`。</Typography>
            <Typography>3. 页面优先用 `Container`、`Grid`、`Stack`、`Box` 搭结构。</Typography>
            <Typography>4. 再接入 `Button`、`Card`、`TextField`、`Dialog` 等业务组件。</Typography>
            <Typography>5. 最后把颜色、间距和圆角沉淀到 theme 里。</Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>关闭</Button>
          <Button
            variant="contained"
            onClick={() => {
              setDialogOpen(false)
              setSnackbarOpen(true)
            }}
          >
            我知道了
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2200}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          MUI demo interaction triggered.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MUIDemo
