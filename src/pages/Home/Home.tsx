import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"

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
  avatar?: string;
}

const USERS_KEY = "lovelevel_users"
const CURRENT_USER_KEY = "lovelevel_current_user"

function Home() {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUserData =
      localStorage.getItem(CURRENT_USER_KEY)

    if (!currentUserData) {
      navigate("/login")
      return
    }

    const currentUser = JSON.parse(currentUserData)

    const usersData =
      localStorage.getItem(USERS_KEY)

    if (!usersData) {
      navigate("/login")
      return
    }

    const users: User[] = JSON.parse(usersData)

    const loggedUser = users.find(
      (user) => user.id === currentUser.id
    )

    if (!loggedUser) {
      localStorage.removeItem(CURRENT_USER_KEY)
      navigate("/login")
      return
    }

    setUser(loggedUser)
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem(CURRENT_USER_KEY)

    navigate("/login")
  }

  if (!user) {
    return null
  }

  return (
    <main className="home-page">

      <header className="home-header">

        <div className="home-logo">
          <span>Love</span>
          <strong>Level</strong>
        </div>

        <div className="home-user">

          <div className="home-user-info">
            <span className="home-user-name">
              {user.displayName}
            </span>

            <span className="home-user-level">
              Nível {user.level}
            </span>
          </div>

          <button
            className="home-avatar"
            type="button"
            onClick={() => navigate("/perfil")}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`Avatar de ${user.displayName}`}
              />
            ) : (
              user.displayName
                .charAt(0)
                .toUpperCase()
            )}
          </button>

        </div>

      </header>

      <div className="home-layout">

        <aside className="home-sidebar">

          <nav className="home-navigation">

            <button
              className="navigation-item active"
              type="button"
            >
              <span>⌂</span>
              <span>Início</span>
            </button>

            <button
              className="navigation-item"
              type="button"
              onClick={() => navigate("/descobrir")}
            >
              <span>♡</span>
              <span>Descobrir</span>
            </button>

            <button
              className="navigation-item"
              type="button"
              onClick={() => navigate("/matches")}
            >
              <span>💬</span>
              <span>Matches</span>
            </button>

            <button
              className="navigation-item"
              type="button"
            >
              <span>♧</span>
              <span>Comunidades</span>
            </button>

          </nav>

          <div className="sidebar-bottom">

            <button
              className="navigation-item"
              type="button"
              onClick={() => navigate("/perfil")}
            >
              <span>⚙</span>
              <span>Perfil</span>
            </button>

            <button
              className="navigation-item logout"
              type="button"
              onClick={handleLogout}
            >
              <span>↪</span>
              <span>Sair</span>
            </button>

          </div>

        </aside>

        <section className="home-content">

          <div className="welcome-section">

            <span className="welcome-label">
              BEM-VINDO AO LOVELEVEL
            </span>

            <h1>
              Encontre alguém que
              <br />
              <span>entende o seu mundo.</span>
            </h1>

            <p>
              Descubra pessoas com interesses parecidos
              com os seus, conheça novas comunidades e
              crie conexões que realmente fazem sentido.
            </p>

            <button
              className="discover-button"
              type="button"
              onClick={() => navigate("/descobrir")}
            >
              Começar a descobrir
              <span>→</span>
            </button>

          </div>

          <div className="home-cards">

            <div className="home-card">

              <span className="card-icon">
                ♡
              </span>

              <div>
                <h2>
                  Descubra pessoas
                </h2>

                <p>
                  Encontre pessoas que compartilham
                  seus jogos, animes, filmes, séries,
                  hobbies e muito mais.
                </p>
              </div>

            </div>

            <div className="home-card">

              <span className="card-icon">
                ✦
              </span>

              <div>
                <h2>
                  Suba de nível
                </h2>

                <p>
                  Participe da comunidade, interaja
                  e evolua seu perfil dentro do
                  LoveLevel.
                </p>
              </div>

            </div>

            <div className="home-card">

              <span className="card-icon">
                ♧
              </span>

              <div>
                <h2>
                  Faça conexões
                </h2>

                <p>
                  Encontre novas amizades ou pessoas
                  com quem você possa construir algo
                  a mais.
                </p>
              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  )
}

export default Home