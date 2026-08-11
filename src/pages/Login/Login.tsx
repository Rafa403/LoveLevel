import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

interface User {
  id: string
  displayName: string
  username: string
  email: string
  password: string
  birthDate: string
  interests: string[]
  connectionPreferences: string[]
  level: number
  xp: number
}

const USERS_KEY = "lovelevel_users"
const CURRENT_USER_KEY = "lovelevel_current_user"

function Login() {
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("")

  function handleIdentifierChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setIdentifier(event.target.value)

    if (error) {
      setError("")
    }
  }

  function handlePasswordChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    setPassword(event.target.value)

    if (error) {
      setError("")
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setError("")

    const normalizedIdentifier =
      identifier.trim().toLowerCase()

    if (!normalizedIdentifier || !password) {
      setError("Preencha todos os campos.")
      return
    }

    const storedUsers = localStorage.getItem(USERS_KEY)

    const users: User[] = storedUsers
      ? JSON.parse(storedUsers)
      : []

    const user = users.find(
      (currentUser) =>
        currentUser.email.toLowerCase() ===
          normalizedIdentifier ||
        currentUser.username.toLowerCase() ===
          normalizedIdentifier
    )

    if (!user) {
      setError(
        "E-mail ou nome de usuário não encontrado."
      )
      return
    }

    if (user.password !== password) {
      setError("Senha incorreta.")
      return
    }

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify({
        id: user.id,
      })
    )

    navigate("/app")
  }

  return (
    <main className="login-page">
      <div className="login-container">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <div className="login-header">
          <h1>Bem-vindo de volta</h1>

          <p>
            Entre no LoveLevel e continue encontrando
            pessoas que entendem o seu mundo.
          </p>
        </div>

        {error && (
          <div className="form-error">
            <span className="form-error-icon">
              !
            </span>

            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="identifier">
              E-mail ou nome de usuário
            </label>

            <input
              id="identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={handleIdentifierChange}
              placeholder="Digite seu e-mail ou usuário"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Senha
            </label>

            <div className="password-input-container">
              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={handlePasswordChange}
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
              >
                <span
                  className={`eye-icon ${
                    showPassword
                      ? "eye-hidden"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <button
              type="button"
              onClick={() => {
                setError(
                  "A recuperação de senha será implementada futuramente."
                )
              }}
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Entrar
          </button>

        </form>

        <div className="register-link">
          <span>
            Ainda não possui uma conta?
          </span>

          <button
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Criar conta
          </button>
        </div>

      </div>
    </main>
  )
}

export default Login