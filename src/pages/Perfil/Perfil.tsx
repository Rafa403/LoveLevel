import { useEffect, useState } from "react";
import "./Perfil.css";
import { useNavigate } from "react-router-dom";

interface Usuario {
  id: string;
  displayName: string;
  username: string;
  email: string;
  birthDate: string;
  level: number;
  xp: number;
  interests: string[];
  connectionPreferences: string[];
  avatar?: string;
  bio?: string;
}

function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioAtual = localStorage.getItem("lovelevel_current_user");

    if (usuarioAtual) {
      try {
        const dados: Usuario = JSON.parse(usuarioAtual);
        setUsuario(dados);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
  }, []);

  if (!usuario) {
    return (
      <main className="perfil-page">
        <div className="perfil-container">
          <p>Não foi possível carregar o perfil.</p>
        </div>
      </main>
    );
  }

  const nome = usuario.displayName || "Usuário";
  const username = usuario.username || "username";
  const bio = usuario.bio || "Ainda não adicionou uma bio.";
  const nivel = usuario.level ?? 1;
  const xp = usuario.xp ?? 0;
  const interesses = usuario.interests ?? [];
  const preferencias = usuario.connectionPreferences ?? [];

  const xpPorNivel = 100;
  const xpAtual = xp % xpPorNivel;
  const progresso = (xpAtual / xpPorNivel) * 100;

  const inicial = nome.charAt(0).toUpperCase();

  return (
    <main className="perfil-page">
      <div className="perfil-container">
        <header className="perfil-header">
          <button
            className="perfil-voltar"
            onClick={() => navigate("/home")}
            aria-label="Voltar"
          >
            ←
          </button>

          <h1>Perfil</h1>
        </header>

        <section className="perfil-card">
          <div className="perfil-avatar">
            {usuario.avatar ? (
              <img src={usuario.avatar} alt={`Avatar de ${nome}`} />
            ) : (
              <span>{inicial}</span>
            )}
          </div>

          <h2 className="perfil-nome">{nome}</h2>

          <p className="perfil-username">@{username}</p>

          <button
            className="perfil-editar"
            onClick={() => navigate("/editar-perfil")}
          >
            Editar perfil
          </button>

          <div className="perfil-progressao">
            <div className="perfil-nivel">
              <span>Nível {nivel}</span>
            </div>

            <div className="perfil-xp">
              <span>
                {xpAtual} / {xpPorNivel} XP
              </span>
            </div>

            <div className="perfil-barra">
              <div
                className="perfil-barra-progresso"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>

          <div className="perfil-secao">
            <h3>Sobre mim</h3>

            <p className="perfil-bio">{bio}</p>
          </div>

          <div className="perfil-secao">
            <h3>Interesses</h3>

            {interesses.length > 0 ? (
              <div className="perfil-interesses">
                {interesses.map((interesse, index) => (
                  <span
                    className="perfil-interesse"
                    key={`${interesse}-${index}`}
                  >
                    {interesse}
                  </span>
                ))}
              </div>
            ) : (
              <p className="perfil-sem-interesses">
                Ainda não adicionou interesses.
              </p>
            )}
          </div>

          <div className="perfil-secao">
            <h3>O que estou procurando</h3>

            {preferencias.length > 0 ? (
              <div className="perfil-interesses">
                {preferencias.map((preferencia, index) => (
                  <span
                    className="perfil-interesse"
                    key={`${preferencia}-${index}`}
                  >
                    {preferencia}
                  </span>
                ))}
              </div>
            ) : (
              <p className="perfil-sem-interesses">
                Ainda não definiu o que procura.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Perfil;
