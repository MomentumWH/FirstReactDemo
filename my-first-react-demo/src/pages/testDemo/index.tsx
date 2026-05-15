import { useState } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { HeroPanel, PageContainer, SectionPanel } from '../../components/pageScaffold'

type StarterForm = {
  name: string
  note: string
  plan: string
}

type StarterTask = {
  id: string
  name: string
  owner: string
  status: 'Ready' | 'Review' | 'Done'
}

const overviewCards = [
  {
    title: 'Button',
    description: '把主按钮、次按钮和图标按钮统一到同一套高对比操作语气里。',
  },
  {
    title: 'Form',
    description: '通过 TextField 和 Select 维持清晰的信息层级，继续扩展也不会乱。',
  },
  {
    title: 'Table',
    description: '用表格和标签展示最常见的后台任务列表结构，便于后续接数据。',
  },
]

const initialTasks: StarterTask[] = [
  { id: '1', name: 'Starter page refresh', owner: 'Ava', status: 'Ready' },
  { id: '2', name: 'Auth flow cleanup', owner: 'Noah', status: 'Review' },
  { id: '3', name: 'Metrics card polish', owner: 'Mia', status: 'Done' },
]

const statusTone: Record<StarterTask['status'], 'primary' | 'warning' | 'success'> = {
  Done: 'success',
  Ready: 'primary',
  Review: 'warning',
}

const TestDemo = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<StarterForm>({
    name: '',
    note: '',
    plan: 'UI',
  })
  const [tasks, setTasks] = useState(initialTasks)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCreateTask = () => {
    const owner = formData.name.trim()

    if (!owner) {
      return
    }

    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        name: `${formData.plan} starter task`,
        owner,
        status: 'Ready',
      },
      ...current,
    ])

    setFormData({
      name: '',
      note: '',
      plan: 'UI',
    })
    setSnackbarOpen(true)
  }

  return (
    <Box component="main" sx={{ minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <PageContainer>
        <HeroPanel
          kicker="Starter Demo"
          title="把起步页也切到同一套黑白橙科技界面"
          description="这个页面保留最常见的表单和列表练习，但视觉系统与首页、MUI Demo 保持一致，后续扩展不会再出现风格断层。"
          metrics={[
            { label: 'Buttons', value: '把导航和操作按钮统一成更克制的终端式动作层。' },
            { label: 'Forms', value: '输入区、提醒和验证状态都沿用相同的表单面板。' },
            { label: 'Tables', value: '数据列表沿用统一卡片和边框语言。' },
          ]}
          actions={(
            <>
              <Button variant="contained" startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/home')}>
                返回首页
              </Button>
              <Button color="secondary" variant="outlined" startIcon={<MailOutlineRoundedIcon />} onClick={() => navigate('/contact')}>
                去联系页
              </Button>
            </>
          )}
          side={(
            <Stack spacing={1.5}>
              <Typography color="text.secondary" sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Build Notes
              </Typography>
              <Typography variant="h5">页面、表单和列表已经切换到统一的高对比外观</Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                这页主要演示从空状态到创建任务的最小闭环，同时保持和其它页面一致的弧度、边框和阴影。
              </Typography>
            </Stack>
          )}
        />

        <SectionPanel
          kicker="Blocks"
          title="常用组件块"
          description="把最常见的起步组件，放进同一套统一卡片里。"
        >
          <Grid container spacing={3}>
            {overviewCards.map((item) => (
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
                    <Stack spacing={1.25}>
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
          kicker="Workflow"
          title="创建任务与查看列表"
          description="用一个最小的交互闭环，继续验证页面级的统一视觉。"
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
                        用 MUI 的基础表单组件完成一个完整的录入面板。
                      </Typography>
                    </div>

                    <TextField
                      label="Owner"
                      placeholder="例如：Alice"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                    />

                    <TextField
                      select
                      label="Task Type"
                      value={formData.plan}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          plan: event.target.value,
                        }))
                      }
                    >
                      <MenuItem value="UI">UI Refactor</MenuItem>
                      <MenuItem value="API">API Integration</MenuItem>
                      <MenuItem value="Component">Component Build</MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      minRows={4}
                      label="Note"
                      placeholder="记录这条任务的目标或备注"
                      value={formData.note}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          note: event.target.value,
                        }))
                      }
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button variant="contained" startIcon={<AddTaskRoundedIcon />} onClick={handleCreateTask} disabled={!formData.name.trim()}>
                    Create
                  </Button>
                  <Button
                    variant="text"
                    onClick={() =>
                      setFormData({
                        name: '',
                        note: '',
                        plan: 'UI',
                      })}
                  >
                    Reset
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
                      <Typography variant="h5">Starter Task List</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                        保留最常见的任务列表结构，同时跟随全局黑白橙风格。
                      </Typography>
                    </div>

                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Owner</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.map((task) => (
                          <TableRow key={task.id} hover>
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.owner}</TableCell>
                            <TableCell align="right">
                              <Chip color={statusTone[task.status]} label={task.status} size="small" />
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2200}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Starter task created with MUI components.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default TestDemo
