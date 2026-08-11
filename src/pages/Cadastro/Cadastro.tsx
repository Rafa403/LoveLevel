import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  birthDate: string;
  interests: string[];
  connectionPreferences: string[];
  level: number;
  xp: number;
}

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(`${birthDate}T00:00:00`);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();

    if (
      !username ||
      !email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.birthDate
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const birthDate = new Date(`${formData.birthDate}T00:00:00`);

    if (Number.isNaN(birthDate.getTime())) {
      setError("Informe uma data de nascimento válida.");
      return;
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (birthDate > today) {
      setError("A data de nascimento não pode estar no futuro.");
      return;
    }

    const age = calculateAge(formData.birthDate);

    if (age < 18) {
      setError("Você precisa ter 18 anos ou mais para criar uma conta.");
      return;
    }

    const users: User[] = JSON.parse(
      localStorage.getItem("lovelevel_users") || "[]",
    );

    const emailAlreadyExists = users.some(
      (user) => user.email.toLowerCase() === email,
    );

    if (emailAlreadyExists) {
      setError("Este e-mail já está cadastrado.");
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      password: formData.password,
      birthDate: formData.birthDate,

      interests: [],
      connectionPreferences: [],

      level: 1,
      xp: 0,
    };

    users.push(newUser);

    localStorage.setItem("lovelevel_users", JSON.stringify(users));

    navigate("/login");
  }

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
        <h1>Crie sua conta</h1>

        <p>Comece a encontrar pessoas que entendem o seu mundo.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome de usuário</label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Como você quer ser chamado?"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>

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
            <label htmlFor="password">Senha</label>

            <div className="password-input-container">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Crie uma senha"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                <span
                  className={`eye-icon ${showPassword ? "eye-hidden" : ""}`}
                ></span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>

            <div className="password-input-container">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                }
              >
                <span
                  className={`eye-icon ${
                    showConfirmPassword ? "eye-hidden" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Data de nascimento</label>

            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              autoComplete="bday"
            />
          </div>

          {error && (
            <div className="form-error">
              <span className="form-error-icon">!</span>

              <span>{error}</span>
            </div>
          )}

          <button type="submit">Criar conta</button>
        </form>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/login")}
        >
          Já tenho uma conta
        </button>
      </section>
    </main>
  );
}

export default Cadastro;
