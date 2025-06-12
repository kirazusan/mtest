

const http = require('http');
const express = require('express');

const app = express();

app.use((req, res) => {
    res.write('Hello World!');
    res.end();
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server running on port 3000');
});