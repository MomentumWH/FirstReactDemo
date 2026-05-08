import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth'
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

const wait = (duration: number) => new Promise<void>(
  (resolve) => window.setTimeout(resolve, duration))

const loginFields: LoginField[] = [
  {
    autoComplete: 'username',
    id: 'login-user',
    label: '\u8d26\u53f7',
    name: 'user',
    placeholder: '\u8bf7\u8f93\u5165\u8d26\u53f7',
    type: 'text',
  },
  {
    autoComplete: 'current-password',
    id: 'login-password',
    label: '\u5bc6\u7801',
    name: 'password',
    placeholder: '\u8bf7\u8f93\u5165\u5bc6\u7801',
    type: 'password',
  },
]

const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {}

  if (!values.user.trim()) {
    errors.user = '\u8bf7\u8f93\u5165\u8d26\u53f7'
  }

  if (!values.password) {
    errors.password = '\u8bf7\u8f93\u5165\u5bc6\u7801'
  }
  else if (values.password.length < 6) {
    errors.password = '\u5bc6\u7801\u81f3\u5c11\u9700\u8981 6 \u4f4d'
  }

  return errors
}

const hasErrors = (errors: LoginFormErrors) => Object.values(errors).some(Boolean)

const submitLogin = async (values: LoginFormValues) => {
  console.log('\u767b\u5f55\u63d0\u4ea4\u6570\u636e\uff1a', {
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
    <main className="login-page">
      <span className="login-orb login-orb--blue" aria-hidden="true" />
      <span className="login-orb login-orb--violet" aria-hidden="true" />
      <span className="login-orb login-orb--green" aria-hidden="true" />

      <section className="loginContainerBox" aria-labelledby="login-title">
        <div className="login-card-glow" aria-hidden="true" />
        <p className="login-eyebrow">Secure Access</p>
        <h1 id="login-title">Login</h1>
        <p className="login-subtitle">
          {'\u6b22\u8fce\u56de\u6765\uff0c\u8f93\u5165\u8d26\u53f7\u5bc6\u7801\u7ee7\u7eed\u8fdb\u5165\u9879\u76ee\u3002'}
        </p>

        <form aria-busy={isSubmitting} data-submit-status={submitStatus} noValidate onSubmit={submitForm}>
          {loginFields.map((field) => {
            const error = errors[field.name]

            return (
              <div className={`login-field${error ? ' login-field--error' : ''}`} key={field.name}>
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
            {isSubmitting ? <span className="login-submit-button__spinner" aria-hidden="true" /> : null}
            <span>{isSubmitting ? '\u767b\u5f55\u4e2d...' : '\u767b\u5f55'}</span>
          </button>

          {submitStatus === 'success' ? (
            <p className="login-form-message login-form-message--success" role="status">
              {'\u767b\u5f55\u4fe1\u606f\u5df2\u63d0\u4ea4\uff0c\u8bf7\u67e5\u770b\u63a7\u5236\u53f0\u3002'}
            </p>
          ) : null}

          {submitStatus === 'error' ? (
            <p className="login-form-message login-form-message--error" role="alert">
              {'\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002'}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default Login
