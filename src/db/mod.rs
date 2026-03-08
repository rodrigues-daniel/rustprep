// src/db/mod.rs
// Responsável por gerenciar a conexão com o PostgreSQL via sqlx

use sqlx::{postgres::PgPoolOptions, PgPool};
use std::env;

/// Cria e retorna um pool de conexões com o PostgreSQL.
/// Lê a DATABASE_URL do ambiente (ex: postgres://user:pass@localhost/dbname)
pub async fn create_pool() -> Result<PgPool, sqlx::Error> {
    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL deve ser definida no ambiente ou .env");

    // Cria o pool com até 5 conexões simultâneas
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    // Garante que a tabela existe antes de servir requisições
    run_migrations(&pool).await?;

    tracing::info!("✅ Conexão com o banco de dados estabelecida");

    Ok(pool)
}

/// Executa as migrations inline — cria a tabela `users` se não existir.
/// Em produção, prefira usar `sqlx migrate run` com arquivos de migration.
async fn run_migrations(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            nome       VARCHAR(255) NOT NULL,
            email      VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        "#,
    )
    .execute(pool)
    .await?;

    tracing::info!("✅ Tabela `users` verificada/criada com sucesso");
    Ok(())
}
