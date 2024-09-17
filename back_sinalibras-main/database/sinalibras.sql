create database sinalibras_db;
use sinalibras_db;

CREATE TABLE tbl_professor (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(250) NOT NULL,
  senha VARCHAR(8) NOT NULL,
  data_nascimento DATE NOT NULL,
  foto_perfil varchar (255), 
  unique key (id),
  unique index(id)
  );

  CREATE TABLE tbl_aluno (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(250) NOT NULL,
  senha VARCHAR(8) NOT NULL,
  data_nascimento DATE NOT NULL,
  foto_perfil varchar (255), 
  unique key (id),
  unique index(id)
  );
  

  
  select * from tbl_usuario ;
  