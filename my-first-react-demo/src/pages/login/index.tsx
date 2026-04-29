import { type ChangeEvent, type FormEvent, useState } from 'react'
import './login.css'

type LoginFormValues = {
  user: string
  password: string
}

type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

type LoginField = {
  autoComplete: string
  id: string
  label: string
  name: keyof LoginFormValues
  placeholder: string
  type: string
}

const initialFormValues: LoginFormValues = {
  user: '',
  password: '',
}

const SUBMIT_TRANSITION_MS = 800

const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration))

const loginFields: LoginField[] = [
  {
    autoComplete: 'username',
    id: 'login-user',
    label: '账号',
    name: 'user',
    placeholder: '请输入账号',
    type: 'text',
  },
  {
    autoComplete: 'current-password',
    id: 'login-password',
    label: '密码',
    name: 'password',
    placeholder: '请输入密码',
    type: 'password',
  },
]

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
  console.log('登录提交数据：', {
    user: values.user,
    password: '******',
  })
}

const Login = () => {
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
      setSubmitStatus('success')
    }
    catch {
      setSubmitStatus('error')
    }
  }

  const isSubmitting = submitStatus === 'submitting'

  return (
    <main className="loginContainerBox">
      <h1>Login</h1>
      <form aria-busy={isSubmitting} data-submit-status={submitStatus} noValidate onSubmit={submitForm}>
        {loginFields.map((field) => {
          const error = errors[field.name]

          return (
            <div className="login-field" key={field.name}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                aria-describedby={error ? `${field.id}-error` : undefined}
                aria-invalid={Boolean(error)}
                autoComplete={field.autoComplete}
                id={field.id}
                name={field.name}
                onChange={updateField(field.name)}
                placeholder={field.placeholder}
                type={field.type}
                value={formValues[field.name]}
              />
              {error ? (
                <p className="login-field__error" id={`${field.id}-error`} role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          )
        })}

        <button className="login-submit-button" disabled={isSubmitting} type="submit">
          <span>{isSubmitting ? '登录中...' : '登录'}</span>
        </button>

        {submitStatus === 'success' ? (
          <p className="login-form-message login-form-message--success" role="status">
            登录信息已提交，请查看控制台。
          </p>
        ) : null}

        {submitStatus === 'error' ? (
          <p className="login-form-message login-form-message--error" role="alert">
            提交失败，请稍后重试。
          </p>
        ) : null}
      </form>
    </main>
  )
}

export default Login
