<div align="center">

# 🎯 ConcursoSim

**Simulador inteligente de concursos públicos**  
Treine por banca, disciplina e nível de dificuldade — do jeito que a prova vai cobrar.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)
![License](https://img.shields.io/badge/licença-MIT-blue?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-bem--vindos-brightgreen?style=flat-square)

</div>

---

## 📌 Sobre o projeto

O **ConcursoSim** nasceu de uma necessidade real: estudar para concursos de forma mais eficiente, simulando as condições reais de cada banca examinadora.

A maioria das plataformas existentes oferece questões genéricas. O ConcursoSim foca em **reproduzir o estilo, linguagem e padrões de cada banca** (CESPE, FCC, VUNESP, FGV, etc.), permitindo que o candidato se familiarize com o formato antes da prova de verdade.

### O que o simulador faz

- Gera simulados com tempo controlado, igual à prova real
- Filtra questões por banca, cargo, disciplina e ano
- Exibe estatísticas de desempenho por tema e banca
- Marca questões para revisão posterior
- Mostra o gabarito comentado ao final de cada simulado

---

## ✨ Funcionalidades

| Funcionalidade | Status |
|---|---|
| Cadastro e login de usuário | 📋 Planejado  |
| Banco de questões por banca | 📋 Planejado  |
| Simulado cronometrado | 📋  Planejado  |
| Filtros por disciplina / banca / ano | ✅ Concluído |
| Gabarito comentado | 📋 Planejado |
| Estatísticas de desempenho | 🔄 Em andamento |
| Modo revisão de erros | 🔄 Em andamento |
| Ranking entre usuários | 📋 Planejado |
| App mobile | 📋 Planejado |

---

## 🛠 Stack

### Backend
- **Linguagem:** Rust
- **Framework:** axum
- **Banco de dados:** PostgreSQL
- **ORM:** sqlx (assíncrono)
- **Migrations:** sqlx-cli
- **Autenticação:** JWT

### Frontend
- **Framework:** React (Vite)
- **Estilização:** CSS-in-JS (inline styles)
- **Requisições:** Fetch API nativa

### Infraestrutura
- **Container:** Docker + Docker Compose
- **CI/CD:** GitHub Actions *(planejado)*

---

## 📁 Estrutura do projeto
```
concurso-sim/
├── backend/                    # API Rust + axum
│   ├── migrations/             # Versionamento do banco (sqlx)
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_questions.sql
│   │   └── 003_create_simulations.sql
│   ├── src/
│   │   ├── main.rs             # Entrada da aplicação
│   │   ├── config.rs           # Variáveis de ambiente
│   │   ├── db/
│   │   │   └── mod.rs          # Pool de conexão PostgreSQL
│   │   ├── models/             # Structs ORM
│   │   │   ├── user.rs
│   │   │   ├── question.rs
│   │   │   └── simulation.rs
│   │   ├── handlers/           # Endpoints HTTP
│   │   │   ├── users.rs
│   │   │   ├── questions.rs
│   │   │   └── simulations.rs
│   │   └── auth/               # Middleware JWT
│   │       └── mod.rs
│   └── Cargo.toml
│
├── frontend/                   # React + Vite
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js              # Wrapper de fetch para a API
│   │   ├── components/
│   │   │   ├── SimulationCard.jsx
│   │   │   ├── QuestionView.jsx
│   │   │   ├── Timer.jsx
│   │   │   ├── ResultChart.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── hooks/
│   │   │   ├── useSimulation.js
│   │   │   └── useAuth.js
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Simulation.jsx
│   │       ├── Results.jsx
│   │       └── Dashboard.jsx
│   ├── index.html
│   └── package.json
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Rust](https://rustup.rs/) 1.75+
- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/) 15+
- [sqlx-cli](https://github.com/launchbadge/sqlx)
```bash
cargo install sqlx-cli --no-default-features --features postgres
```

---

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/concurso-sim.git
cd concurso-sim
```

### 2. Configure as variáveis de ambiente
```bash
# backend/.env
cp backend/.env.example backend/.env
```

Edite o arquivo `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:senha@localhost/concursosim
JWT_SECRET=troque_por_uma_chave_segura
PORT=3000
```

### 3. Crie o banco e execute as migrations
```bash
# Cria o banco de dados
createdb concursosim

# Aplica todas as migrations
cd backend
sqlx migrate run
```

### 4. Suba o backend
```bash
cd backend
cargo run
# API disponível em http://localhost:3000
```

### 5. Suba o frontend
```bash
cd frontend
npm install
npm run dev
# App disponível em http://localhost:5173
```

---

## 🐳 Rodando com Docker
```bash
# Sobe banco + backend + frontend de uma vez
docker-compose up --build
```

Acesse em `http://localhost:5173`.

---

## 🔌 Endpoints da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/auth/register` | Cadastro de usuário | ✗ |
| `POST` | `/auth/login` | Login → retorna JWT | ✗ |
| `GET` | `/questions` | Lista questões com filtros | ✓ |
| `GET` | `/questions/:id` | Detalhes de uma questão | ✓ |
| `POST` | `/simulations` | Inicia um novo simulado | ✓ |
| `GET` | `/simulations/:id` | Busca simulado em andamento | ✓ |
| `POST` | `/simulations/:id/answer` | Responde uma questão | ✓ |
| `POST` | `/simulations/:id/finish` | Finaliza e gera resultado | ✓ |
| `GET` | `/dashboard/stats` | Estatísticas do usuário | ✓ |

> Endpoints marcados com ✓ exigem o header `Authorization: Bearer <token>`.

---

## 🗃 Modelo de dados
```
users
  id · nome · email · senha_hash · created_at

questions
  id · enunciado · alternativas (JSON) · gabarito
  disciplina · banca · ano · cargo · nivel_dificuldade

simulations
  id · user_id · banca · disciplina · total_questoes
  tempo_limite · iniciado_em · finalizado_em

simulation_answers
  id · simulation_id · question_id · resposta_marcada
  correta · tempo_gasto_segundos
```

---

## 📊 Bancas suportadas

- [x] CESPE / CEBRASPE
- [ ] FCC
- [ ] VUNESP
- [ ] FGV
- [ ] IBFC
- [ ] AOCP *(em breve)*
- [ ] IDECAN *(em breve)*

---

## 🤝 Contribuindo

Este é um projeto pessoal, mas contribuições são muito bem-vindas!

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Faça o commit: `git commit -m "feat: adiciona filtro por ano"`
4. Push: `git push origin feat/minha-feature`
5. Abra um Pull Request

Por favor, siga o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  Feito com ☕ e muita vontade de passar no concurso.
</div>
