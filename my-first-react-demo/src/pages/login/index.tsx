import { type ChangeEvent, type FormEvent, useState } from 'react'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth'

type LoginFormValues = {
  password: string
  user: string
}

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialFormValues: LoginFormValues = {
  user: '',
  password: '',
}

const SUBMIT_TRANSITION_MS = 800

const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration))

const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {}

  if (!values.user.trim()) {
    errors.user = '请输入账号'
  }

  if (!values.password) {
    errors.password = '请输入密码'
  }
  else if (values.password.length < 6) {
    errors.password = '密码至少需要 6 位'
  }

  return errors
}

const hasErrors = (errors: LoginFormErrors) => Object.values(errors).some(Boolean)

const submitLogin = async (values: LoginFormValues) => {
  console.log('登录提交数据:', {
    user: values.user,
    password: '******',
  })
}

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [formValues, setFormValues] = useState<LoginFormValues>(initialFormValues)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const updateField = (fieldName: keyof LoginFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: nextValue,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }))

    setSubmitStatus('idle')
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateLoginForm(formValues)

    if (hasErrors(nextErrors)) {
      setErrors(nextErrors)
      setSubmitStatus('idle')
      return
    }

    const payload: LoginFormValues = {
      user: formValues.user.trim(),
      password: formValues.password,
    }

    setSubmitStatus('submitting')

    try {
      await Promise.all([submitLogin(payload), wait(SUBMIT_TRANSITION_MS)])
      login({ user: payload.user })
      setSubmitStatus('success')
      navigate('/home', { replace: true })
    }
    catch {
      setSubmitStatus('error')
    }
  }

  const isSubmitting = submitStatus === 'submitting'

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: 'min(1180px, calc(100vw - 32px))',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' },
          gap: 2.5,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.72)',
            background:
              'linear-gradient(145deg, rgba(22,53,69,0.94) 0%, rgba(21,94,99,0.9) 50%, rgba(200,107,42,0.86) 100%)',
            color: '#fff',
            overflow: 'hidden',
          }}
        >
          <Stack spacing={3.25}>
            <Box
              sx={{
                display: 'grid',
                width: 58,
                height: 58,
                placeItems: 'center',
                borderRadius: 3,
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <ShieldRoundedIcon />
            </Box>

            <div>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.84 }}>
                Secure Access
              </Typography>
              <Typography variant="h2" sx={{ mt: 1.5, maxWidth: 520, color: '#fff' }}>
                进入这个更完整的 React 页面样机
              </Typography>
              <Typography sx={{ mt: 1.5, maxWidth: 560, lineHeight: 1.9, color: 'rgba(255,255,255,0.76)' }}>
                登录页也被纳入统一视觉系统，左侧负责建立氛围与信息预期，右侧负责快速完成表单动作。这样页面不只是可用，也更像一个真正的产品入口。
              </Typography>
            </div>

            <Stack spacing={1.25}>
              {[
                '统一主题、导航、卡片与表单风格',
                '保留 TypeScript 的状态与输入约束',
                '适合继续接入真实鉴权与接口请求',
              ].map((item) => (
                <Box
                  key={item}
                sx={{
                  px: 1.75,
                  py: 1.35,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                >
                  <Typography sx={{ fontWeight: 700 }}>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.72)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(249,252,255,0.94) 100%)',
          }}
        >
          <Stack spacing={2.5}>
            <Box
              sx={{
                display: 'grid',
                width: 56,
                height: 56,
                placeItems: 'center',
                borderRadius: 3,
                color: '#fff',
                background: 'linear-gradient(135deg, #155e63, #c86b2a)',
              }}
            >
              <LockRoundedIcon />
            </Box>

            <div>
              <Typography color="primary.dark" sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Login
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                欢迎回来
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.8 }}>
                输入账号和密码继续进入项目。当前表单已经统一到新的页面视觉语言，后续接真实登录接口会更自然。
              </Typography>
            </div>

            <Box component="form" noValidate onSubmit={submitForm}>
              <Stack spacing={2}>
                <TextField
                  label="账号"
                  autoComplete="username"
                  error={Boolean(errors.user)}
                  helperText={errors.user}
                  value={formValues.user}
                  onChange={updateField('user')}
                />

                <TextField
                  label="密码"
                  type="password"
                  autoComplete="current-password"
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  value={formValues.password}
                  onChange={updateField('password')}
                />

                <Button disabled={isSubmitting} type="submit" variant="contained">
                  {isSubmitting ? <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} /> : null}
                  {isSubmitting ? '登录中...' : '登录'}
                </Button>

                {submitStatus === 'success' ? (
                  <Alert severity="success">登录信息已提交，正在进入首页。</Alert>
                ) : null}

                {submitStatus === 'error' ? (
                  <Alert severity="error">提交失败，请稍后重试。</Alert>
                ) : null}
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
