import { useNavigate } from "react-router-dom"
import "./AppWelcome.css"

function AppWelcome() {
  const navigate = useNavigate()

  return (
    <main className="app-welcome">

      <div className="welcome-content">

        <h1>LoveLevel</h1>

        <h2>Seu universo. Seu match.</h2>

        <p>
          Conecte-se com pessoas que compartilham
          as mesmas paixões que você.
        </p>

        <div className="welcome-buttons">

          <button
            className="welcome-button login-button"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>

          <button
            className="welcome-button register-button"
            onClick={() => navigate("/cadastro")}
          >
            Criar conta
          </button>

        </div>

        <div className="welcome-features">

          <span>🎮 Seus interesses</span>

          <span>❤️ Seus matches</span>

          <span>💬 Suas conexões</span>

        </div>

      </div>

    </main>
  )
}

export default AppWelcome