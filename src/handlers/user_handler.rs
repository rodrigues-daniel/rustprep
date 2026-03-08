// src/handlers/user_handler.rs
// Contém os handlers HTTP para todas as operações CRUD de usuários

use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::user::{CreateUserRequest, UpdateUserRequest, User};

// ─────────────────────────────────────────────
// GET /users
// Retorna todos os usuários cadastrados
// ─────────────────────────────────────────────
pub async fn list_users(
    State(pool): State<PgPool>,
) -> Result<Json<Vec<User>>, (StatusCode, String)> {
    let users = sqlx::query_as::<_, User>(
        "SELECT id, nome, email, created_at, updated_at FROM users ORDER BY created_at DESC",
    )
    .fetch_all(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(users))
}

// ─────────────────────────────────────────────
// GET /users/:id
// Retorna um usuário específico pelo UUID
// ─────────────────────────────────────────────
pub async fn get_user(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> Result<Json<User>, (StatusCode, String)> {
    let user = sqlx::query_as::<_, User>(
        "SELECT id, nome, email, created_at, updated_at FROM users WHERE id = $1",
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    match user {
        Some(u) => Ok(Json(u)),
        None => Err((
            StatusCode::NOT_FOUND,
            format!("Usuário {} não encontrado", id),
        )),
    }
}

// ─────────────────────────────────────────────
// POST /users
// Cria um novo usuário com nome e email
// ─────────────────────────────────────────────
pub async fn create_user(
    State(pool): State<PgPool>,
    Json(payload): Json<CreateUserRequest>,
) -> Result<(StatusCode, Json<User>), (StatusCode, String)> {
    // Valida que os campos não estão vazios
    if payload.nome.trim().is_empty() || payload.email.trim().is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            "nome e email são obrigatórios".to_string(),
        ));
    }

    let user = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (nome, email)
        VALUES ($1, $2)
        RETURNING id, nome, email, created_at, updated_at
        "#,
    )
    .bind(&payload.nome)
    .bind(&payload.email)
    .fetch_one(&pool)
    .await
    .map_err(|e| {
        // Detecta violação de unicidade no email
        if e.to_string().contains("unique") {
            (StatusCode::CONFLICT, "Email já cadastrado".to_string())
        } else {
            (StatusCode::INTERNAL_SERVER_ERROR, e.to_string())
        }
    })?;

    // Retorna 201 Created com o usuário criado
    Ok((StatusCode::CREATED, Json(user)))
}

// ─────────────────────────────────────────────
// PUT /users/:id
// Atualiza nome e/ou email de um usuário existente
// ─────────────────────────────────────────────
pub async fn update_user(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateUserRequest>,
) -> Result<Json<User>, (StatusCode, String)> {
    // Busca o usuário atual para aplicar atualizações parciais
    let existing = sqlx::query_as::<_, User>(
        "SELECT id, nome, email, created_at, updated_at FROM users WHERE id = $1",
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?
    .ok_or((
        StatusCode::NOT_FOUND,
        format!("Usuário {} não encontrado", id),
    ))?;

    // Usa os valores novos se fornecidos, senão mantém os existentes
    let novo_nome = payload.nome.unwrap_or(existing.nome);
    let novo_email = payload.email.unwrap_or(existing.email);

    let user = sqlx::query_as::<_, User>(
        r#"
        UPDATE users
        SET nome = $1, email = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING id, nome, email, created_at, updated_at
        "#,
    )
    .bind(&novo_nome)
    .bind(&novo_email)
    .bind(id)
    .fetch_one(&pool)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    Ok(Json(user))
}

// ─────────────────────────────────────────────
// DELETE /users/:id
// Remove um usuário pelo UUID
// ─────────────────────────────────────────────
pub async fn delete_user(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> Result<StatusCode, (StatusCode, String)> {
    let result = sqlx::query("DELETE FROM users WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    // rows_affected() == 0 significa que o ID não existia
    if result.rows_affected() == 0 {
        return Err((
            StatusCode::NOT_FOUND,
            format!("Usuário {} não encontrado", id),
        ));
    }

    // 204 No Content indica deleção bem-sucedida sem corpo de resposta
    Ok(StatusCode::NO_CONTENT)
}
