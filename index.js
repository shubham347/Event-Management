const http = require('http');
const express = require('express');
const routes = require('./routes');
const app = express();
app.use(express.json());
app.use("/", routes);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log(`Server starts listening on port 3000`)
});
