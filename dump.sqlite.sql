-- TABLE
CREATE TABLE aluno(
	id integer PRIMARY KEY AUTOINCREMENT,
    nome varchar(100) not NULL,
    cgm varchar(20) unique NOT NULL,
    endereco_b text NOT NULL,
    endereco_r text NOT NULL,
    endereco_n text NOT NULL
);
CREATE TABLE funcionario(
  id integer PRIMARY KEY AUTOINCREMENT,
  nome varchar(100) NOT NULL,
  cpf varchar(11) UNIQUE NOT NULL,
  endereco_b text NOT NULL,
  endereco_r text NOT NULL,
  endereco_n text NOT NULL
  );
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
