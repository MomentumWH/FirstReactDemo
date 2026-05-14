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
  Paper,
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
import { PageContainer } from '../../components/pageScaffold'

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
    description: '使用 MUI Button 组合主按钮、次按钮和带图标操作。',
  },
  {
    title: 'Form',
    description: '通过 TextField 和 Select 搭建基础录入表单，方便继续接校验和接口。',
  },
  {
    title: 'Table',
    description: '用 Table 和 Chip 组合出常见后台任务列表。',
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
        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            border: '1px solid rgba(15, 118, 110, 0.14)',
            p: { xs: 3, md: 5 },
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(232,244,253,0.96) 48%, rgba(238,248,243,0.94) 100%)',
          }}
        >
          <Stack spacing={2.5}>
            <Chip
              color="primary"
              icon={<RocketLaunchRoundedIcon />}
              label="MUI Starter Demo"
              sx={{ width: 'fit-content', fontWeight: 700 }}
            />
            <Typography component="h1" variant="h3">
              保留一套 MUI 组件库后的统一起步页
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.8 }}>
              这里把原来的 Ant Design 演示页替换成了纯 MUI 版本，后续你可以直接在这一页继续扩展按钮、表单、表格和反馈组件，不再混用两套 UI 体系。
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/home')}>
                Back Home
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<MailOutlineRoundedIcon />}
                onClick={() => navigate('/contact')}
              >
                Go Contact
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {overviewCards.map((item) => (
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
                  <Stack spacing={1.25}>
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
                    <Typography variant="h5">Create Starter Task</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                      用一组 MUI 基础组件完成最常见的创建任务表单。
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
                <Button
                  variant="contained"
                  startIcon={<AddTaskRoundedIcon />}
                  onClick={handleCreateTask}
                  disabled={!formData.name.trim()}
                >
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
                border: '1px solid rgba(15, 23, 42, 0.08)',
                backgroundColor: 'rgba(255,255,255,0.86)',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <div>
                    <Typography variant="h5">Starter Task List</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                      这一块保留了最常见的后台表格展示结构。
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
