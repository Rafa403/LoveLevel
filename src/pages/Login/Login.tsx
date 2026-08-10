function Login() {
  return (
    <main>
      <h1>Login</h1>

      <p>Entre na sua conta do LoveLevel.</p>

      <form>
        <input
          type="email"
          placeholder="E-mail"
        />

        <input
          type="password"
          placeholder="Senha"
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </main>
  )
}

export default Login