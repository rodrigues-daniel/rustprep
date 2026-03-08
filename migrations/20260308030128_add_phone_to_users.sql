-- Add migration script here
-- Adiciona campo de telefone (nullable para não quebrar registros existentes)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);