const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

//funcoes extras
function idade(data_de_nascimento) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - data_de_nascimento.getFullYear();
  let mes =  hoje.getMonth() - data_de_nascimento.getMonth();
  if(mes < 0|| (mes === 0 && hoje.getDate() < data_de_nascimento.getDate())){
    idade--;
  }
  return idade;
}

function diferenca_em_dias(data1, data2) {
  const tempo = Math.abs(data1 - data2);
  const msDias = 24 * 60 * 60 * 1000; // Milissegundos em um dia
  return Math.floor(tempo / msDias);
 

}

//aqui
 connection.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
        return;
    }
     console.log('Conectado ao banco de dados');
});


//ate aqui
function listar(callback) {
  const query = 'SELECT * FROM usuarios';
  connection.query(query, (error, results) => {
    if (error) {
      console.log('Erro ao listar usuários:', error);
      callback(error, null);
    } else {
      console.log('Usuários listados com sucesso:', results);
      callback(null, results);
    }
})
}

function cadastrar(nome, altura, peso, senha, data_de_nascimento, callback) {
  const query = 'INSERT INTO usuarios (nome, altura, peso, senha, data_de_nascimento) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [nome, altura, peso, senha, data_de_nascimento], (error, results) => {
    if (error) {
      console.log('Erro ao cadastrar usuário:', error);
      callback(error, null);
    }
    const usuarios_id = results.insertId;
  //ofensiva
  const ofensiva = "INSERT INTO ofensivas (usuarios_id, ofensiva_atual, ultimo_ativo, maior_ofensiva, vidas) VALUES (?, 1, NOW(), 1, 3)";
  connection.query(ofensiva, [usuarios_id], (error, results) => {
    if (error) {
      console.log('Erro ao cadastrar ofensiva:', error);
      callback(error, null);
    } else {
      console.log('Ofensiva cadastrada com sucesso:', results);
      callback(null, results);
    }
  })
})
}

//voltar para colocar exercicicos
function cadastrar_treino(usuarios_id, nome,tipo, callback) {
  const query = 'INSERT INTO treinos (usuarios_id, nome, tipo) VALUES (?, ?, ?)';

  connection.query(query, [usuarios_id, nome, tipo], (error, results) => {
    if (error) {
      console.log('Erro ao cadastrar treino:', error);
      callback(error, null);
    } else {
      console.log('Treino cadastrado com sucesso:', results);
      callback(null, results);
    }
  });
}

function listar_treino(usuarios_id, callback) {
  const query = 'SELECT treinos.id as treino_id, treinos.nome as treino_nome, usuarios.nome as nome, usuarios.id as id_usuario FROM treinos INNER JOIN usuarios ON treinos.usuarios_id = usuarios.id WHERE usuarios.id = ? ;';
  
  connection.query(query, [usuarios_id] , (error, results) => {
    if (error) {
      console.log('Erro ao listar treinos:', error);
      callback(error, null);
    } else {
      console.log('Treinos listados com sucesso:', results);
      callback(null, results);
    }
  });
}

function iniciar_treino(usuarios_id, treino_id, callback) {
  const query = `
    SELECT * FROM treinos
    WHERE id = ? AND usuarios_id = ?
  `;

  connection.query(query, [treino_id, usuarios_id], (error, results) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }

    if (results.length === 0) {
      return callback(
        new Error('Treino não encontrado para este usuário'),
        null
      );
    }

    console.log('Treino encontrado:', results[0].id);

    const query2 = `
      INSERT INTO qntd_treino (treinos_id, hora_inicio)
      VALUES (?, NOW())
    `;

    connection.query(query2, [treino_id], (error, results2) => {
      if (error) {
        console.log(error);
        return callback(error, null);
      }

      return callback(null, {
        treino: results[0].nome,
        registro: results2
      });
    });
  });
}

function finalizar_treino(usuarios_id, treino_id, callback){
 
  const query = `
    SELECT * FROM treinos
    WHERE id = ? AND usuarios_id = ?
  `;

  connection.query(query, [treino_id, usuarios_id], (error, results) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }

    if (results.length === 0) {
      return callback(
        new Error('Treino não encontrado para este usuário'),
        null
      );
    }

    const queryRegistro = `
      SELECT id FROM qntd_treino 
      WHERE treinos_id = ? AND hora_fim IS NULL 
      ORDER BY id DESC LIMIT 1
    `;

    connection.query(queryRegistro, [treino_id], (error, resultadoRegistro) => {
      if (error) {
        console.log(error);
        return callback(error, null);
      }

      if (resultadoRegistro.length === 0) {
        return callback(
          new Error('Nenhum treino em andamento foi encontrado para finalizar'),
          null
        );
      }

      const id_qtd = resultadoRegistro[0].id

    console.log('Treino encontrado:', results[0].id);

    const query2 = `
      UPDATE qntd_treino 
      SET hora_fim = NOW()
      WHERE treinos_id = ? AND id = ?
    `;

    connection.query(query2, [treino_id, id_qtd], (error, results2) => {
      if (error) {
        console.log(error);
        return callback(error, null);
      }

      return callback(null, {
        treino: results[0].nome,
        registro: results2
      });
    });
  });

})
}
//LOGIN
function login(nome, senha, callback) {
  const query = 'SELECT * FROM usuarios WHERE nome = ? AND senha = ?';
  

  connection.query(query, [nome, senha], (error, results) => {
    if (error) {
      console.log('Erro ao realizar login:', error);
      return callback(error, null);
    }  

    if (results.length === 0) {
      console.log('Credenciais inválidas');
      return callback(new Error('Credenciais inválidas'), null);
    }

    const usuario = results[0];
      
    console.log('Login bem-sucedido:', results[0].id);
    //callback(null, results[0].id);
    name = results[0].nome;
    password = results[0].senha;
    id= results[0].id;
    altura = results[0].altura;
    peso = results[0].peso;
    idadeU =  idade(results[0].data_de_nascimento);
    

    const ofensiva = "SELECT * FROM ofensivas WHERE usuarios_id = ?";

    connection.query(ofensiva, [id], (error, resultadoOfensiva) => {
      if (error) {
        console.log('Erro ao buscar ofensiva:', error);
        return callback(error, null);
      }
      
      if (resultadoOfensiva.length === 0) {
        console.log('Nenhuma ofensiva encontrada para o usuário');
        return callback(new Error('Nenhuma ofensiva encontrada'), null);
      }

    const dataAtual = new Date().toISOString().split('T')[0];
    if (diferenca_em_dias(dataAtual, resultadoOfensiva[0].ultimo_ativo) === 1) {
    const ofensiva2 = "UPDATE ofensivas SET ofensiva_atual = ofensiva_atual + 1, ultimo_ativo = NOW() WHERE usuarios_id = ?";

    connection.query(ofensiva2, [id], (error, resultoAtualizar) => {
      if (error) {
        console.log('Erro ao atualizar ofensiva:', error);
        return callback(error, null);
      }
      const resultadoAtualizar = resultoAtualizar.affectedRows > 0 ? 'Ofensiva atualizada com sucesso' : 'Nenhuma ofensiva atualizada';

      console.log('Ofensiva atualizada com sucesso');

      return callback(null, {
        id: usuario.id,
        nome: usuario.nome,
        altura: usuario.altura,
        peso: usuario.peso,
        idade: idadeU,
        ofensiva: resultadoAtualizar 
         
      });
    });
  }else if(diferenca_em_dias(dataAtual, resultadoOfensiva[0].ultimo_ativo) > 1){
    const ofensiva3 = "UPDATE ofensivas SET vidas = GREATEST(vidas - 1, 0), ultimo_ativo = NOW() WHERE usuarios_id = ?";
    connection.query(ofensiva3, [id], (error, resultoAtualizar) => {
      if (error){
        console.log('Erro ao atualizar ofensiva:', error);
        return callback(error, null);
      }

      return callback(null,{
        id: usuario.id,
        nome: usuario.nome,
        altura: usuario.altura,
        idade: idadeU,
        peso: usuario.peso,
        ofensiva: resultadoOfensiva[0].ofensiva_atual,
        vidas: resultadoOfensiva[0].vidas

      })
  } 
)}
    callback(null, {
        id: usuario.id,
        nome: usuario.nome,
        altura: usuario.altura,
        peso: usuario.peso,
        idade: idadeU,
        ofensiva: resultadoOfensiva[0].ofensiva_atual,
        vidas: resultadoOfensiva[0].vidas
      });
  
  });
});
}

//HOME
function home(callback){
  //nome
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  connection.query(query, [id], (error, results) => {
      if (error) { 
        return callback(error, null);
      }
      
      //callback(null, results);
      const query2 = 'SELECT * FROM ofensivas WHERE usuarios_id = ?';
      connection.query(query2, [id], (error, resultado2) => {
        if(error){
          return callback(error, null);
        }

        const query3 = "SELECT * FROM nivel WHERE usuarios_id = ?"
        connection.query(query3, [id], (error,resultado3)=>{
          if (error){
            return callback(error,null)
          }
        
        return callback(null, {
          nome: results[0].nome,
          ofensiva: resultado2[0].ofensiva_atual,
          vida: resultado2[0].vidas,
          xp: resultado3[0].xp,
          nivel: resultado3[0].experiencia,
          
        })
      })
    })
  })
}

function adicionar_amizade(usuarios_id1, usuarios_id2, callback) {
    if (usuarios_id1 === usuarios_id2) {
        return callback(
            new Error('Não é possível adicionar a si mesmo como amigo'),
            null
        );
    }

    const verificar = `
        SELECT * FROM amizades
        WHERE
            (usuarios_id1 = ? AND usuarios_id2 = ?)
            OR
            (usuarios_id1 = ? AND usuarios_id2 = ?)
    `;

    connection.query(
        verificar,
        [usuarios_id1, usuarios_id2, usuarios_id2, usuarios_id1],
        (error, results) => {
            if (error) {
                console.log('Erro ao verificar amizade existente:', error);
                return callback(error, null);
            }

            if (results.length > 0) {
                return callback(
                    new Error('Amizade ou solicitação já existe'),
                    null
                );
            }

            const query = `
                INSERT INTO amizades
                (usuarios_id1, usuarios_id2, status)
                VALUES (?, ?, 'pendente')
            `;

            connection.query(
                query,
                [usuarios_id1, usuarios_id2],
                (error, results) => {
                    if (error) {
                        return callback(error, null);
                    }

                    callback(null, results);
                }
            );
        }
    );
}


function aceitar_amizade(usuarios_id1, usuarios_id2, callback) {
    const query = `
        UPDATE amizades
        SET status = 'aceita'
        WHERE usuarios_id1 = ?
        AND usuarios_id2 = ?
        AND status = 'pendente'
    `;

    connection.query(
        query,
        [usuarios_id1, usuarios_id2],
        (error, results) => {
            if (error) {
                return callback(error, null);
            }

            if (results.affectedRows === 0) {
                return callback(
                    new Error('Solicitação não encontrada'),
                    null
                );
            }

            callback(null, results);
        }
    );
}


function recusar_amizade(usuarios_id1, usuarios_id2, callback) {
    const query = `
        DELETE FROM amizades
        WHERE usuarios_id1 = ?
        AND usuarios_id2 = ?
        AND status = 'pendente'
    `;

    connection.query(
        query,
        [usuarios_id1, usuarios_id2],
        (error, results) => {
            if (error) {
                return callback(error, null);
            }

            if (results.affectedRows === 0) {
                return callback(
                    new Error('Solicitação não encontrada'),
                    null
                );
            }

            callback(null, results);
        }
    );
}


function listar_amigos(usuario_id, callback) {
    const query = `
        SELECT
            usuarios.id,
            usuarios.nome
        FROM amizades
        INNER JOIN usuarios
            ON (
                usuarios.id = amizades.usuarios_id1
                AND amizades.usuarios_id2 = ?
            )
            OR (
                usuarios.id = amizades.usuarios_id2
                AND amizades.usuarios_id1 = ?
            )
        WHERE amizades.status = 'aceita'
    `;

    connection.query(
        query,
        [usuario_id, usuario_id],
        (error, results) => {
            if (error) {
                return callback(error, null);
            }

            callback(null, results);
        }
    );
}


function listar_solicitacoes(usuario_id, callback) {
    const query = `
        SELECT
            amizades.id AS amizade_id,
            usuarios.id AS usuario_id,
            usuarios.nome
        FROM amizades
        INNER JOIN usuarios
            ON usuarios.id = amizades.usuarios_id1
        WHERE amizades.usuarios_id2 = ?
        AND amizades.status = 'pendente'
    `;

    connection.query(
        query,
        [usuario_id],
        (error, results) => {
            if (error) {
                return callback(error, null);
            }

            callback(null, results);
        }
    );
}

function perfil(callback){
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  connection.query(query, [id], (error, results) => {
      if (error) { 
        return callback(error, null);
      }
      
      //callback(null, results);
      const query2 = 'SELECT * FROM ofensivas WHERE usuarios_id = ?';
      connection.query(query2, [id], (error, resultado2) => {
        if(error){
          return callback(error, null);
        }

        const query3 = "SELECT * FROM nivel WHERE usuarios_id = ?"
        connection.query(query3, [id], (error,resultado3)=>{
          if (error){
            return callback(error,null)
          }

          const query4 = "SELECT * FROM treinos WHERE usuarios_id = ?"
          connection.query(query4, [id], (error,resultado4) => {
            if (error){
              return callback(error,null)
            }
            const treino_id = resultado4[0].id
              const query5 = "SELECT * FROM qntd_treino WHERE treinos_id = ? AND hora_fim IS NOT NULL"

              connection.query(query5, [treino_id], (error,resultado5)=> {
                if (error) {
                  console.log(error)
                  return callback(error,null)
                }
                  return callback(null, {
              nome: results[0].nome,
              ofensiva: resultado2[0].ofensiva_atual,
              xp: resultado3[0].xp,
              nivel: resultado3[0].experiencia,
              treinos_concluidos : resultado5[0]
            })
          })
        })
      })
    })
  })

}





module.exports = {
  connection,
  listar,
  cadastrar,
  cadastrar_treino,
  listar_treino,
  login,
  home,
  iniciar_treino,
  finalizar_treino,
  perfil,
  adicionar_amizade,
  aceitar_amizade,
  recusar_amizade,
  listar_amigos,
  listar_solicitacoes
}