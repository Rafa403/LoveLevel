import { FormEvent, ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Cadastro.css"

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

interface FormData {
  displayName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  birthDate: string
}

const USERS_KEY = "lovelevel_users"

function Cadastro() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  })

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

    if (error) {
      setError("")
    }
  }

  function calculateAge(birthDate: string): number {
    const today = new Date()
    const birth = new Date(`${birthDate}T00:00:00`)

    let age = today.getFullYear() - birth.getFullYear()

    const monthDifference = today.getMonth() - birth.getMonth()

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--
    }

    return age
  }

  function isFutureDate(birthDate: string): boolean {
    const today = new Date()
    const selectedDate = new Date(`${birthDate}T00:00:00`)

    today.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)

    return selectedDate > today
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    const displayName = formData.displayName.trim()
    const username = formData.username.trim().toLowerCase()
    const email = formData.email.trim().toLowerCase()

    if (
      !displayName ||
      !username ||
      !email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.birthDate
    ) {
      setError("Preencha todos os campos.")
      return
    }

    if (username.length < 3) {
      setError(
        "O nome de usuário deve ter pelo menos 3 caracteres."
      )
      return
    }

    if (formData.password.length < 6) {
      setError(
        "A senha deve ter pelo menos 6 caracteres."
      )
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (isFutureDate(formData.birthDate)) {
      setError(
        "A data de nascimento não pode estar no futuro."
      )
      return
    }

    const age = calculateAge(formData.birthDate)

    if (age < 18) {
      setError(
        "Não é possível criar uma conta. O LoveLevel é destinado a pessoas com 18 anos ou mais."
      )
      return
    }

    const storedUsers = localStorage.getItem(USERS_KEY)

    const users: User[] = storedUsers
      ? JSON.parse(storedUsers)
      : []

    const emailAlreadyExists = users.some(
      (user) => user.email.toLowerCase() === email
    )

    if (emailAlreadyExists) {
      setError("Este e-mail já está cadastrado.")
      return
    }

    const usernameAlreadyExists = users.some(
      (user) => user.username.toLowerCase() === username
    )

    if (usernameAlreadyExists) {
      setError("Este nome de usuário já está em uso.")
      return
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      displayName,
      username,
      email,
      password: formData.password,
      birthDate: formData.birthDate,
      interests: [],
      connectionPreferences: [],
      level: 1,
      xp: 0,
    }

    users.push(newUser)

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    )

    navigate("/login")
  }

  return (
    <main className="cadastro-page">
      <div className="cadastro-container">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <div className="cadastro-header">
          <h1>Crie sua conta</h1>

          <p>
            Entre para o LoveLevel e encontre pessoas
            que entendem o seu mundo.
          </p>
        </div>

        {error && (
          <div className="form-error">
            <span className="form-error-icon">!</span>

            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="displayName">
              Nome de exibição
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Como você quer ser chamado?"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">
              Nome de usuário
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Escolha um nome de usuário"
              autoComplete="username"
            />

            <span className="input-hint">
              Seu nome de usuário será único e usado para login.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seuemail@email.com"
              autoComplete="email"
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
                value={formData.password}
                onChange={handleChange}
                placeholder="Crie uma senha"
                autoComplete="new-password"
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

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirmar senha
            </label>

            <div className="password-input-container">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
              >
                <span
                  className={`eye-icon ${
                    showConfirmPassword
                      ? "eye-hidden"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">
              Data de nascimento
            </label>

            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
            />

            <span className="input-hint">
              Você precisa ter 18 anos ou mais para
              criar uma conta.
            </span>
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Criar conta
          </button>

        </form>

        <div className="login-link">
          <span>Já possui uma conta?</span>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>
        </div>

      </div>
    </main>
  )
}

export default Cadastro