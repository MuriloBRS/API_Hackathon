CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    altura DECIMAL(5,2) NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_de_nascimento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    treinos_id INT NOT NULL,
    FOREIGN KEY (treinos_id) REFERENCES treinos(id)
);
--TREINOS

CREATE TABLE IF NOT EXISTS treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);

ALTER TABLE treinos ADD COLUMN nome VARCHAR(60) NOT NULL;

ALTER TABLE treinos ADD COLUMN tipo INT NOT NULL;

--OFENSIVA
CREATE TABLE IF NOT EXISTS ofensivas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    ofensiva_atual INT NOT NULL,
    ultimo_ativo DATETIME NOT NULL,
    maior_ofensiva INT NOT NULL,
    vidas INT NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);


--OBJETIVOS
CREATE TABLE IF NOT EXISTS objetivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    meta_peso DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);


--CONQUISTAS
CREATE TABLE IF NOT EXISTS conquistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    tipo INT NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);


--BATALHAS
CREATE TABLE IF NOT EXISTS batalhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id1 INT NOT NULL,
    usuarios_id2 INT NOT NULL,
    FOREIGN KEY (usuarios_id1) REFERENCES usuarios(id),
    FOREIGN KEY (usuarios_id2) REFERENCES usuarios(id)
);

ALTER TABLE batalhas
ADD COLUMN status ENUM('pendente', 'aceita', 'recusada', 'finalizada')
DEFAULT 'pendente';


--NIVEL
CREATE TABLE IF NOT EXISTS nivel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id INT NOT NULL,
    xp INT NOT NULL,
    experiencia INT NOT NULL,
    FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);


--RELACIONADO A TREINOS
CREATE TABLE IF NOT EXISTS qntd_treino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    treinos_id INT NOT NULL,
    hora_inicio TIMESTAMP NOT NULL,
    hora_fim TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (treinos_id) REFERENCES treinos(id)
    
);

CREATE TABLE IF NOT EXISTS amizades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarios_id1 INT NOT NULL,
    usuarios_id2 INT NOT NULL,
     status ENUM('pendente', 'aceita') NOT NULL,
    FOREIGN KEY (usuarios_id1) REFERENCES usuarios(id),
    FOREIGN KEY (usuarios_id2) REFERENCES usuarios(id)
);

