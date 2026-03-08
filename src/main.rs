// src/main.rs
// Ponto de entrada da aplicação — configura o servidor HTTP e as rotas

mod db;
mod handlers;
mod models;

use axum::{
    routing::{delete, get, post, put},
    Router,
};
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use handlers::user_handler::{create_user, delete_user, get_user, list_users, update_user};

#[tokio::main]
async fn main() {
    // Carrega variáveis de ambiente do arquivo .env (se existir)
    dotenvy::dotenv().ok();

    // Inicializa o sistema de logging com filtro via RUST_LOG
    // Exemplo: RUST_LOG=debug cargo run
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Cria o pool de conexões e executa migrations
    let pool = db::create_pool()
        .await
        .expect("Falha ao conectar ao banco de dados");

    // Define as rotas REST para o CRUD de usuários
    let app = Router::new()
        // Lista todos os usuários
        .route("/users", get(list_users))
        // Cria um novo usuário
        .route("/users", post(create_user))
        // Busca um usuário por ID
        .route("/users/:id", get(get_user))
        // Atualiza um usuário por ID
        .route("/users/:id", put(update_user))
        // Remove um usuário por ID
        .route("/users/:id", delete(delete_user))
        // Injeta o pool como estado compartilhado entre os handlers
        .with_state(pool)
        // Adiciona logging automático de cada requisição HTTP
        .layer(TraceLayer::new_for_http())
        // Habilita CORS para qualquer origem (ajuste em produção)
        .layer(CorsLayer::permissive());

    // Endereço de escuta do servidor
    let addr = std::net::SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::info!("🚀 Servidor rodando em http://{}", addr);

    // Inicia o servidor HTTP com axum
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Falha ao criar listener TCP");

    axum::serve(listener, app)
        .await
        .expect("Falha ao iniciar o servidor");
}
