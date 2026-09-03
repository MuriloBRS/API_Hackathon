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



app.listen(3002, () => {
    console.log('http://localhost:3002' )
})