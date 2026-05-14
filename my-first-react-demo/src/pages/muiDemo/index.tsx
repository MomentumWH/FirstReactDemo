import { useMemo, useState } from 'react'
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
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
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

const metricCards = [
  {
    title: 'ThemeProvider',
    description: '统一颜色、圆角、字体和组件默认行为。',
    icon: <AutoAwesomeRoundedIcon fontSize="small" />,
  },
  {
    title: 'Layout + Surface',
    description: '用 Container、Grid、Paper、Card 快速搭出页面骨架。',
    icon: <InsightsRoundedIcon fontSize="small" />,
  },
  {
    title: 'Form + Feedback',
    description: '用 TextField、Dialog、Snackbar 处理输入与交互反馈。',
    icon: <RocketLaunchRoundedIcon fontSize="small" />,
  },
]

const MUIDemo = () => {
  const [formData, setFormData] = useState({
    projectName: 'Marketing Console',
    category: 'dashboard',
    notifyTeam: true,
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const completion = useMemo(() => {
    return checklist.reduce((sum, item) => sum + item.progress, 0) / checklist.length
  }, [])

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: 'min(1680px, calc(100vw - clamp(64px, calc(4vw + 40px), 88px)))',
          mx: 'auto',
        }}
      >
        <Stack spacing={3.5}>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 3, md: 5 },
              border: '1px solid rgba(15, 118, 110, 0.14)',
              background:
                'linear-gradient(140deg, rgba(255,255,255,0.92) 0%, rgba(233,247,243,0.95) 55%, rgba(255,244,235,0.94) 100%)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -64,
                right: -32,
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(20,184,166,0.22), transparent 70%)',
              }}
            />

            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={2}>
                  <Chip
                    color="primary"
                    label="Material UI Demo Template"
                    sx={{ width: 'fit-content', fontWeight: 700 }}
                  />
                  <Typography variant="h3" component="h1">
                    用一页把 MUI 的常见用法串起来
                  </Typography>
                  <Typography color="text.secondary" sx={{ maxWidth: 680, fontSize: 17, lineHeight: 1.75 }}>
                    这个模板演示了 MUI 在真实页面里的基本组合方式：先用主题统一风格，再用布局组件组织结构，最后接入表单、表格和反馈组件完成业务交互。
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button color="primary" variant="contained" onClick={() => setDialogOpen(true)}>
                      查看提交流程
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={() => setSnackbarOpen(true)}>
                      触发消息提示
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    color: '#f8fafc',
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', color: '#fff' }}>M</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>MUI Starter Board</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.72)' }}>
                          页面结构、表单和反馈已经准备好
                        </Typography>
                      </Box>
                    </Stack>
                    <Divider sx={{ borderColor: 'rgba(248,250,252,0.12)' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.82)' }}>
                      主题完成度
                    </Typography>
                    <LinearProgress
                      color="secondary"
                      value={completion}
                      variant="determinate"
                      sx={{ height: 10, borderRadius: 999 }}
                    />
                    <Typography variant="body2" sx={{ color: 'rgba(248,250,252,0.72)' }}>
                      当前模板平均进度 {Math.round(completion)}%
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            {metricCards.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    backgroundColor: 'rgba(255,255,255,0.84)',
                  }}
                >
                  <CardContent>
                    <Stack spacing={1.5}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 42, height: 42 }}>{item.icon}</Avatar>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {item.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  backgroundColor: 'rgba(255,255,255,0.86)',
                }}
              >
                <CardContent>
                  <Stack spacing={2.5}>
                    <div>
                      <Typography variant="h5">表单模板</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                        这里展示的是最常见的表单录入场景。
                      </Typography>
                    </div>

                    <TextField
                      label="项目名称"
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
                      label="页面类型"
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
                      control={
                        <Switch
                          checked={formData.notifyTeam}
                          onChange={(event) =>
                            setFormData((current) => ({
                              ...current,
                              notifyTeam: event.target.checked,
                            }))
                          }
                        />
                      }
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
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  backgroundColor: 'rgba(255,255,255,0.86)',
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <div>
                      <Typography variant="h5">数据列表模板</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                        MUI 的表格适合后台管理类页面快速搭建。
                      </Typography>
                    </div>

                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>模块</TableCell>
                          <TableCell>负责人</TableCell>
                          <TableCell>进度</TableCell>
                          <TableCell align="right">状态</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {checklist.map((row) => (
                          <TableRow key={row.label} hover>
                            <TableCell>{row.label}</TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell>{row.progress}%</TableCell>
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
        </Stack>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>组件库的典型使用流程</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.25}>
            <Typography>1. 安装依赖：`@mui/material`、`@emotion/react`、`@emotion/styled`。</Typography>
            <Typography>2. 在入口挂 `ThemeProvider` 和 `CssBaseline`。</Typography>
            <Typography>3. 页面里优先用 `Container`、`Grid`、`Stack`、`Box` 搭布局。</Typography>
            <Typography>4. 再接入 `Button`、`Card`、`TextField`、`Dialog` 等业务组件。</Typography>
            <Typography>5. 最后把颜色、间距、圆角沉到 theme，避免页面里到处重复写样式。</Typography>
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
          MUI 示例交互已触发
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MUIDemo
