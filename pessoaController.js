const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');

const pessoas = [
    {
        "id": 1,
        "nome": "Kawan",
        "celular": "995673822"
    },

    {
        "id": 2,
        "nome": "Robson",
        "celular": "995673867"
    }
];


router.get('/', (req, res) => {
    return res.json(pessoas);
});


router.get('/:id', (req, res) => {
    return res.json({ mensagem: 'pessoa por ' + req.params.id });
});

router.post('/', (req, res) => {
    const { nome, celular } = req.body;
    console.log(req.body);
    const pessoa = {
        'nome': nome,
        'celular': celular,
        id: randomUUID()
    }
    pessoas.push(pessoa);
    return res.json(pessoa);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada!' });
    }

    if (nome) pessoa.nome = nome;
    if (celular) pessoa.celular = celular;

    res.json(pessoa);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Pessoa não encontrada!' });
    }

    const pessoaRemovida = pessoas.splice(index, 1);

    res.json(pessoaRemovida);
});


module.exports = router;