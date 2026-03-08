// src/models/user.rs
// Define as estruturas de dados do usuário usadas em toda a aplicação

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Representa um usuário completo como armazenado no banco de dados
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: Uuid,
    pub nome: String,
    pub email: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// Payload recebido para criação de um novo usuário (POST /users)
#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    pub nome: String,
    pub email: String,
}

/// Payload recebido para atualização parcial/total de um usuário (PUT /users/:id)
#[derive(Debug, Deserialize)]
pub struct UpdateUserRequest {
    pub nome: Option<String>,
    pub email: Option<String>,
}
