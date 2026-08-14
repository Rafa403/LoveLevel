import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditarPerfil.css";

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

const interessesDisponiveis = [
  "🎮 Games",
  "📺 Animes",
  "🎬 Filmes",
  "📚 Livros",
  "🧙 RPG",
  "💻 Tecnologia",
  "🎨 Arte",
  "🎵 Música",
];

const preferenciasDisponiveis = [
  "❤️ Relacionamento",
  "🤝 Amizade",
  "🎮 Jogar",
  "💬 Conversar",
  "👥 Comunidades",
];

function EditarPerfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [interests, setInterests] = useState<string[]>([]);
  const [connectionPreferences, setConnectionPreferences] =
    useState<string[]>([]);

  const [erro, setErro] = useState("");

  useEffect(() => {
    const usuarioAtual = localStorage.getItem("lovelevel_current_user");

    if (!usuarioAtual) {
      navigate("/perfil");
      return;
    }

    try {
      const dados: Usuario = JSON.parse(usuarioAtual);

      setUsuario(dados);

      setDisplayName(dados.displayName || "");
      setUsername(dados.username || "");
      setBio(dados.bio || "");

      setInterests(dados.interests || []);
      setConnectionPreferences(
        dados.connectionPreferences || []
      );
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      navigate("/perfil");
    }
  }, [navigate]);

  const alternarInteresse = (interesse: string) => {
    setInterests((atual) =>
      atual.includes(interesse)
        ? atual.filter((item) => item !== interesse)
        : [...atual, interesse]
    );
  };

  const alternarPreferencia = (preferencia: string) => {
    setConnectionPreferences((atual) =>
      atual.includes(preferencia)
        ? atual.filter((item) => item !== preferencia)
        : [...atual, preferencia]
    );
  };

  const salvarAlteracoes = () => {
    if (!usuario) {
      return;
    }

    setErro("");

    const nomeLimpo = displayName.trim();
    const usernameLimpo = username.trim();

    if (!nomeLimpo) {
      setErro("Digite um nome de exibição.");
      return;
    }

    if (!usernameLimpo) {
      setErro("Digite um username.");
      return;
    }

    const usuariosSalvos = localStorage.getItem("lovelevel_users");

    if (!usuariosSalvos) {
      setErro("Não foi possível encontrar os usuários.");
      return;
    }

    try {
      const usuarios: Usuario[] = JSON.parse(usuariosSalvos);

      const usernameExiste = usuarios.some(
        (outroUsuario) =>
          outroUsuario.id !== usuario.id &&
          outroUsuario.username.toLowerCase() ===
            usernameLimpo.toLowerCase()
      );

      if (usernameExiste) {
        setErro("Esse username já está sendo usado.");
        return;
      }

      const usuarioAtualizado: Usuario = {
        ...usuario,
        displayName: nomeLimpo,
        username: usernameLimpo,
        bio: bio.trim(),
        interests,
        connectionPreferences,
      };

      const usuariosAtualizados = usuarios.map(
        (outroUsuario) =>
          outroUsuario.id === usuario.id
            ? usuarioAtualizado
            : outroUsuario
      );

      localStorage.setItem(
        "lovelevel_users",
        JSON.stringify(usuariosAtualizados)
      );

      localStorage.setItem(
        "lovelevel_current_user",
        JSON.stringify(usuarioAtualizado)
      );

      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setErro("Ocorreu um erro ao salvar as alterações.");
    }
  };

  if (!usuario) {
    return null;
  }

  return (
    <main className="editar-perfil-page">
      <div className="editar-perfil-container">

        <header className="editar-perfil-header">
          <button
            className="editar-perfil-voltar"
            onClick={() => navigate("/perfil")}
            aria-label="Voltar"
          >
            ←
          </button>

          <h1>Editar perfil</h1>
        </header>

        <section className="editar-perfil-card">

          <div className="editar-avatar">
            <span>
              {displayName.charAt(0).toUpperCase() || "U"}
            </span>
          </div>

          <div className="editar-campo">
            <label htmlFor="displayName">
              Nome de exibição
            </label>

            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(event) =>
                setDisplayName(event.target.value)
              }
              placeholder="Digite seu nome"
            />
          </div>

          <div className="editar-campo">
            <label htmlFor="username">
              Username
            </label>

            <div className="editar-username">
              <span>@</span>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="username"
              />
            </div>
          </div>

          <div className="editar-campo">
            <label htmlFor="bio">
              Bio
            </label>

            <textarea
              id="bio"
              value={bio}
              onChange={(event) =>
                setBio(event.target.value)
              }
              placeholder="Conte um pouco sobre você..."
              maxLength={160}
            />

            <span className="editar-contador">
              {bio.length}/160
            </span>
          </div>

          <div className="editar-secao">
            <h2>Interesses</h2>

            <p>
              Escolha os assuntos que fazem parte do seu mundo.
            </p>

            <div className="editar-opcoes">
              {interessesDisponiveis.map((interesse) => (
                <button
                  type="button"
                  key={interesse}
                  className={
                    interests.includes(interesse)
                      ? "editar-opcao selecionada"
                      : "editar-opcao"
                  }
                  onClick={() =>
                    alternarInteresse(interesse)
                  }
                >
                  {interesse}
                </button>
              ))}
            </div>
          </div>

          <div className="editar-secao">
            <h2>O que estou procurando</h2>

            <p>
              Escolha como você deseja se conectar com outras
              pessoas.
            </p>

            <div className="editar-opcoes">
              {preferenciasDisponiveis.map((preferencia) => (
                <button
                  type="button"
                  key={preferencia}
                  className={
                    connectionPreferences.includes(preferencia)
                      ? "editar-opcao selecionada"
                      : "editar-opcao"
                  }
                  onClick={() =>
                    alternarPreferencia(preferencia)
                  }
                >
                  {preferencia}
                </button>
              ))}
            </div>
          </div>

          {erro && (
            <p className="editar-erro">
              {erro}
            </p>
          )}

          <div className="editar-acoes">
            <button
              type="button"
              className="editar-cancelar"
              onClick={() => navigate("/perfil")}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="editar-salvar"
              onClick={salvarAlteracoes}
            >
              Salvar alterações
            </button>
          </div>

        </section>
      </div>
    </main>
  );
}

export default EditarPerfil;