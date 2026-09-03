const { listar, cadastrar, cadastrar_treino, listar_treino, login, home, iniciar_treino, finalizar_treino, perfil, adicionar_amizade, aceitar_amizade, recusar_amizade, listar_amigos, listar_solicitacoes } = require('../model/Model')
module.exports ={
   Listar_users(req,res){
      res.send(listar())
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
      const { usuarios_id, treino_id} = req.body
      if(!usuarios_id || !treino_id){
         return res.status(400).json({message : "todos os campos tem que estar preechidos"})
      }
      finalizar_treino(usuarios_id, treino_id, (error,results) => {
         if(error){
            return res.status(500).json({message: "erro ao finalizar o treino"})
         }
          res.status(200).json(results)
      })
     
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
   }

   
}