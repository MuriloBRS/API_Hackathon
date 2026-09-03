const express = require('express');
const Router = express.Router();
const controller = require('../controller/Controller');

// Router.get('/listar', (req,res)=> {
//     controller.Listar_users(req,res);
// })

//CADASTRO
Router.post('/cadastro', (req,res)=> {
    controller.Cadastro(req,res);
})
//LOGIN
Router.get('/login', (req,res) => {
    controller.login(req,res);
})

//HOME
Router.get('/home', (req,res) => {
    controller.home(req,res)
})

//TREINOS
Router.post('/treinoC', (req,res) => {
    controller.cadastrar_treino(req,res);
})

Router.get('/treinoL', (req,res) => {
    controller.listar_treino(req,res);
})

Router.get('/treinoI', (req,res)=>{
    controller.iniciar_treinoController(req,res)
})

Router.get('/treino', (req,res) => {
    controller.finalizar_treinoController(req,res)
})

Router.get('/perfil', (req,res) => {
    controller.perfil(req,res)
})

Router.post('/amizades', (req,res) => {
    controller.adicionarAmizadeC(req,res)
});

Router.put('/amizades/aceitar', (req,res) => {
    controller.aceitarAmizadeC(req,res)
});

Router.put('/amizades/recusar', (req,res) => {
    controller.recusarAmizadeC(req,res)
});

Router.get('/amizades/:usuarios_id', (req,res) => {
    controller.listarAmigosC(req,res)
});

Router.get('/amizades/solicitacoes/:usuarios_id', (req,res) => {
    controller.listarSolicitacoesC(req,res)
});




module.exports = Router;