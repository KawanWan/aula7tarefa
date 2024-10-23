const express = require('express');
const pessoaController = require('./pessoaController');


const app = express();


app.use(express.json());
app.use('/pessoa', pessoaController);


app.listen(3000, () => console.log('Server is running on port 3000'));
    