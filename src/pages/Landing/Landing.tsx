import { useNavigate } from "react-router-dom"
import "./Landing.css"


function Landing() {
    const navigate = useNavigate()
  return (
    <>
      <header>
        <h1>LoveLevel</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">Sobre</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <main>
          <h2>Encontre seu player 2 🎮</h2>

          <p>
            Um app de relacionamento feito para nerds, gamers,
            geeks e apaixonados por tecnologia.
          </p>

          <button className="btn" onClick={() => navigate("/app")}>
            Começar
          </button>
        </main>
      </section>

      <section id="features">
        <h2>O que você encontra aqui</h2>

        <div className="features">
          <div className="card">
            <h3>🎮 Match por interesses</h3>

            <p>
              Encontre pessoas que gostam dos mesmos jogos,
              animes e séries que você.
            </p>
          </div>

          <div className="card">
            <h3>💬 Chat em tempo real</h3>

            <p>
              Converse com seus matches de forma rápida e divertida.
            </p>
          </div>

          <div className="card">
            <h3>🧠 Perfil nerd</h3>

            <p>
              Monte seu perfil com suas paixões geek.
            </p>
          </div>
        </div>
      </section>

      <section id="about">
        <h2>Sobre o LoveLevel</h2>

        <p>
          Nosso objetivo é conectar pessoas que compartilham
          a mesma paixão pelo mundo nerd.
        </p>
      </section>
    </>
  )
}

export default Landing