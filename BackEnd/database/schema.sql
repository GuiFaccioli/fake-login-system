-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS flowlogin;
USE flowlogin;

-- Tabela que armazena os dados usados nos fluxos de cadastro, login e perfil.
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);
