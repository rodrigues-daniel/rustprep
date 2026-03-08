-- Add migration script here
-- Melhora performance de buscas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);