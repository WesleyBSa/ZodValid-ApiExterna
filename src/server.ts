import express, { request } from 'express';
import z from 'zod';
import { jsonplaceholderResponse } from './schemas/jsonplaceholderResponse';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
    res.json({ pong: true });
});


server.get('/posts', async (req, res) => {
    const request = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await request.json();

    const result = jsonplaceholderResponse.safeParse(data);
    if(!result.success) {
        res.status(500).json({ error: 'Ocorreu um erro interno.' });
        return;
    }

    //Processar
    let totalPosts = result.data.length;

    res.json({ total: totalPosts });
});


server.listen(8000, () => {
    console.log('Rodando: http://localhost:8000/');
});