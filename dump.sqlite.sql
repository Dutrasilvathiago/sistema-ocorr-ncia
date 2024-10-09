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
CREATE TABLE ocorencia(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cmg_aluno VARCHAR(20) UNIQUE NOT NULL,
  func_cpf VARCHAR(20) UNIQUE NOT NULL,
  ocorrencia VARCHAR(200),
  ocor_data TEXT, 
  FOREIGN KEY (cmg_aluno) REFERENCES aluno(cmg)
  );
CREATE TABLE renponsavel(
  id_resp INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(40) NOT NULL,
  telefone TEXT NOT NULL,
  cgm_al VARCHAR(20) UNIQUE not NULL,
  FOREIGN KEY (cgm_al) REFERENCES aluno(cgm)
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
