const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./src/routes/Routes');
const connection = require('./src/model/Model');


const app = express()
app.use(express.json())
app.use(cors())

//Rotas
app.use(router)



app.listen(process.env.PORT || 3002, '0.0.0.0', () => {
    console.log('Servidor iniciado' )
})
