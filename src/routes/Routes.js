const express = require('express');
const Router = express.Router();
const controller = require('../controller/Controller');

Router.get('/', (req,res)=> {
    controller.teste(req,res)
})

module.exports = Router;