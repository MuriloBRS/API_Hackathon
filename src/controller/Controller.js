const { listar, cadastrar, cadastrar_treino, listar_treino, login, home, iniciar_treino, finalizar_treino, perfil, adicionar_amizade, aceitar_amizade, recusar_amizade, listar_amigos, listar_solicitacoes, batalhas, editar_objetivo, verificar_objetivo, adicionar_objetivo, concluir_objetivo, editar_usuario, adicionar_xp, solicitar_batalha, aceitar_batalha, recusar_batalha, listar_solicitacoes_batalha, listar_batalhas_ativas, listar_conquistas, verificar_primeira_conquista } = require('../model/Model')

module.exports ={
   Listar_users(req, res) {

    listar((error, results) => {

        if (error) {
            return res.status(500).json({
                message: "Erro ao listar usuários"
            });
        }

        return res.status(200).json(results);

    });

},

   Cadastro(req,res){
      const { nome, altura, peso, senha,data} = req.body;

      if(!nome || !altura || !peso || !senha || !data){
         return res.status(400).json({ message: "todos os campos tem que estar preenchidos"})
      }
      cadastrar(nome, altura, peso, senha, data, (error, results) => {
         if (error) {
            return res.status(500).json({ message: "Erro ao cadastrar usuário", error: error });
         }
         res.status(201).json(results);
      });
   },

   cadastrar_treino(req,res){
      console.log(req.body)
      const {usuarios_id, nome, tipo } = req.body;
      if(!usuarios_id || !nome || !tipo){
         return res.status(400).json({ message: "todos os campos tem que estar preenchidos"})
      }
      cadastrar_treino(usuarios_id, nome, tipo, (error, results) => {
         if (error) {
            return res.status(500).json({ message: "Erro ao cadastrar treino", error: error });
         }
         res.status(201).json(results);
      });
   },

   listar_treino(req,res){
      const {uid} = req.body;
      if(!uid){
         return res.status(400).json({ message: "todos os campos tem que estar preenchidos"})
      }
      listar_treino(uid, (error, results) => {
         if (error) {
            return res.status(500).json({ message: "Erro ao listar treinos", error: error });
         }
         res.status(200).json(results);
      });
   },

   iniciar_treinoController(req,res){
      const { usuarios_id, treino_id } = req.body
      if (!usuarios_id || !treino_id){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      iniciar_treino(usuarios_id, treino_id, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao iniciao treino"})
         }
         res.status(200).json(results)

      })
      
   },

   finalizar_treinoController(req,res){

  const { usuarios_id, treino_id } = req.body;

  if(!usuarios_id || !treino_id){
    return res.status(400).json({
      message: "todos os campos tem que estar preenchidos"
    });
  }

  finalizar_treino(usuarios_id, treino_id, (error, results) => {

    if(error){
      console.log("ERRO REAL AO FINALIZAR:", error);
      return res.status(500).json({
        message: "erro ao finalizar o treino",
        erro: error.message
      });
    }

    res.status(200).json(results);

  });
},

   adicionarAmizadeC(req, res) {
    const { usuarios_id1, usuarios_id2 } = req.body;

    if (!usuarios_id1 || !usuarios_id2) {
        return res.status(400).json({
            message: "Todos os campos têm que estar preenchidos"
        });
    }

    adicionar_amizade(usuarios_id1, usuarios_id2, (error, results) => {
        if (error) {
            console.log("ERRO AO SOLICITAR AMIZADE:", error);

            return res.status(500).json({
                message: "erro ao solicitar amizade",
                erro: error.message
            });
        }

        return res.status(201).json({
            message: "Solicitação de amizade enviada",
            results
        });
    });
},

   aceitarAmizadeC(req,res){
      const { usuarios_id1, usuarios_id2 } = req.body
      if (!usuarios_id1 || !usuarios_id2){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      aceitar_amizade(usuarios_id1, usuarios_id2, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao aceitar amizade"})
         }
         res.status(200).json(results)
      })
   },

   recusarAmizadeC(req,res){
      const { usuarios_id1, usuarios_id2 } = req.body
      if (!usuarios_id1 || !usuarios_id2){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      recusar_amizade(usuarios_id1, usuarios_id2, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao recusar amizade"})
         }
         res.status(200).json(results)
      })
   },

   listarAmigosC(req,res){
      const { usuarios_id } = req.params
      if (!usuarios_id){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      listar_amigos(usuarios_id, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao listar amigos"})
         }
         res.status(200).json(results)
      })
   },

   listarSolicitacoesC(req,res){
      const { usuarios_id } = req.params
      if (!usuarios_id){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      listar_solicitacoes(usuarios_id, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao listar solicitacoes"})
         }
         res.status(200).json(results)
      })
   },

   batalhasC(req,res){
   const { usuarios_id1, usuarios_id2 } = req.params;

   if (!usuarios_id1 || !usuarios_id2){
      return res.status(400).json({
         message: "Todos os campos têm que estar preenchidos"
      });
   }

   batalhas(
      usuarios_id1,
      usuarios_id2,
      (error, results) => {

         if (error){
         console.log("ERRO AO BUSCAR BATALHA:", error);

         return res.status(500).json({
            message: "Erro ao listar batalha",
            erro: error.message
         });
         }

         res.status(200).json(results);
      }
   );
   },

   solicitarBatalhaC(req, res) {

    const { usuarios_id1, usuarios_id2 } = req.body;

    if (!usuarios_id1 || !usuarios_id2) {
        return res.status(400).json({
            message: "Os dois IDs dos usuários são obrigatórios"
        });
    }

    solicitar_batalha(
        usuarios_id1,
        usuarios_id2,
        (error, results) => {

            if (error) {

                console.log(
                    "ERRO AO SOLICITAR BATALHA:",
                    error
                );

                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(201).json({
                message: "Solicitação de batalha enviada!",
                resultado: results
            });
        }
    );
   },


   aceitarBatalhaC(req, res) {

      const { id } = req.params;

      if (!id) {
         return res.status(400).json({
               message: "ID da batalha é obrigatório"
         });
      }

      aceitar_batalha(
         id,
         (error, results) => {

               if (error) {

                  console.log(
                     "ERRO AO ACEITAR BATALHA:",
                     error
                  );

                  return res.status(500).json({
                     message: error.message
                  });
               }

               return res.status(200).json({
                  message: "Batalha aceita!",
                  resultado: results
               });
         }
      );
   },


   recusarBatalhaC(req, res) {

      const { id } = req.params;

      if (!id) {
         return res.status(400).json({
               message: "ID da batalha é obrigatório"
         });
      }

      recusar_batalha(
         id,
         (error, results) => {

               if (error) {

                  console.log(
                     "ERRO AO RECUSAR BATALHA:",
                     error
                  );

                  return res.status(500).json({
                     message: error.message
                  });
               }

               return res.status(200).json({
                  message: "Batalha recusada!",
                  resultado: results
               });
         }
      );
   },

   listarSolicitacoesBatalhaC(req, res) {

    
    const { usuarios_id } = req.params;

    if (!usuarios_id) {
        return res.status(400).json({
            message: "ID do usuário é obrigatório"
        });
    }

    listar_solicitacoes_batalha(
        usuarios_id,
        (error, results) => {

            if (error) {
                console.log("ERRO AO LISTAR SOLICITAÇÕES:", error);

                return res.status(500).json({
                    message: "Erro ao listar solicitações"
                });
            }

            res.status(200).json(results);
        }
    );
},

   listarBatalhasAtivasC(req, res) {

      const { usuarios_id } = req.params;

      if (!usuarios_id) {
         return res.status(400).json({
               message: "ID do usuário é obrigatório"
         });
      }

      listar_batalhas_ativas(
         usuarios_id,
         (error, results) => {

               if (error) {
                  console.log(
                     "ERRO AO LISTAR BATALHAS ATIVAS:",
                     error
                  );

                  return res.status(500).json({
                     message: "Erro ao listar batalhas ativas",
                     erro: error.message
                  });
               }

               return res.status(200).json(results);
         }
      );
   },

   verificarObjetivoC(req,res){
      const { usuarios_id } = req.params;
      if (!usuarios_id){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      verificar_objetivo(usuarios_id, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao verificar objetivo"})
         }
         res.status(200).json(results)
      })
   },

   editarObjetivoC(req,res){
    console.log("BODY EDITAR OBJETIVO:", req.body);

    const { usuarios_id, novo_objetivo } = req.body;

    if (!usuarios_id || novo_objetivo === undefined || novo_objetivo === null) {
        return res.status(400).json({
            message: "ID do usuário e novo objetivo são obrigatórios",
            recebido: req.body
        });
    }

    editar_objetivo(
        usuarios_id,
        novo_objetivo,
        (error, results) => {
            if (error) {
                console.log("ERRO MODEL EDITAR OBJETIVO:", error);

                return res.status(500).json({
                    message: "erro ao editar objetivo",
                    erro: error.message
                });
            }

            console.log("OBJETIVO EDITADO:", results);

            return res.status(200).json({
                message: "Objetivo atualizado com sucesso",
                resultado: results
            });
        }
    );
},

   adicionarObjetivoC(req,res){
      const { objetivo, usuarios_id } = req.body;
      if (!objetivo || !usuarios_id){
         return res.status(400).json({message: "todos os campos tem que estar preenchidos"})
      }
      adicionar_objetivo(objetivo, usuarios_id, (error,results) => {
         if (error){
            return res.status(500).json({message : "erro ao adicionar objetivo"})
         }
         res.status(200).json(results)
      })
   },

   concluir_objetivoC(req, res) {
    const { usuarios_id } = req.params;

    if (!usuarios_id) {
        return res.status(400).json({
            message: "ID é obrigatório!"
        });
    }

    concluir_objetivo(usuarios_id, (error, results) => {

        if (error) {
            console.log("🔥 ERRO REAL AO CONCLUIR OBJETIVO:");
            console.log(error);
            console.log("MESSAGE:", error.message);
            console.log("CODE:", error.code);
            console.log("SQL:", error.sql);

            return res.status(500).json({
                message: "erro ao concluir objetivo",
                erro: error.message,
                code: error.code
            });
        }

        console.log("✅ OBJETIVO CONCLUÍDO:", results);

        return res.status(200).json(results);
    });
},

   login(req,res){
      const {nome, senha} = req.body;
      if(!nome || !senha){
         return res.status(400).json({ message: "todos os campos tem que estar preenchidos"})
      }
      login(nome, senha, (error, userId) => {
         if (error) {
            return res.status(401).json({ message: "Credenciais inválidas" });
         }
         res.status(200).json({ message: "Login bem-sucedido", userId: userId });
      });
   },

   home(req,res){
      home((error, results) => {
         if (error) {
           return res.status(500).json({ message: "Erro ao realizar home", error: error });
         }
      res.status(200).json(results);
      });
   },
   perfil(req,res){
      perfil((error,results) => {
         if (error) {
            return res.status(500).json({ message: "error ao realizar perfil", erro: error})
         }
      res.status(200).json(results)
      })
   },

   adicionarXpC(req, res) {
   const { usuarios_id, quantidade } = req.body;

   if (!usuarios_id || quantidade === undefined) {
      return res.status(400).json({
         erro: 'usuarios_id e quantidade são obrigatórios'
      });
   }

   adicionar_xp(usuarios_id, quantidade, (error, resultado) => {
      if (error) {
         console.log('Erro ao adicionar XP:', error);
         return res.status(500).json({
         erro: error.message
         });
      }

      res.status(200).json(resultado);
   });
   },

   listar_conquistas(req, res) {

  const { usuarios_id } = req.params;

  if (!usuarios_id) {
    return res.status(400).json({
      message: "Usuário não informado"
    });
  }

  listar_conquistas(usuarios_id, (error, results) => {

    if (error) {
      return res.status(500).json({
        message: "Erro ao listar conquistas"
      });
    }

    res.status(200).json(results);

  });
},

   editarUsuarioC(req, res) {

      const { usuarios_id, ...dados } = req.body;

      if (!usuarios_id) {
         return res.status(400).json({
            message: "O ID do usuário é obrigatório"
         });
      }

      editar_usuario(usuarios_id, dados, (error, results) => {

         if (error) {
            return res.status(400).json({
            message: error.message
            });
         }

         res.status(200).json({
            message: "Usuário atualizado com sucesso",
            resultado: results
         });
      });
   },

   

   
}