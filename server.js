const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./src/routes/Routes');

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)



app.listen(process.env.PORT, () => {
    console.log('http://localhost:' + process.env.PORT)
})