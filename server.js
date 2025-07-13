const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    res.send(`
        <h1>Obrigado pela sugestão!</h1>
        <p>Recebemos sua ideia para o lanche <strong>${nome}</strong>.</p>
        <a href="/">Voltar</a>
    `);
});

app.post('/contato', (req, res) => {
    const { nome, email } = req.body;
    res.status(200).send(`
        <h1>Contato Recebido!</h1>
        <p>Obrigado pelo contato, <strong>${nome}</strong>! Responderemos em breve.</p>
        <a href="/">Voltar</a>
    `);
});

app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});

app.listen(PORT, () => {
    console.log(`Servidor DevBurger rodando. Acesse: http://localhost:${PORT}`);
});