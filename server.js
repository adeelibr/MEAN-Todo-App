const express = require('express');
const path    = require('path');
const http  = require('http');
const parser  = require('body-parser');

const app = express(); 

// let index = require('./server/routes/index');
let todos = require('./server/routes/todos');

// app.set('views', path.join(__dirname, '/server/views'));
// app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'dist')));

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/', index);
app.use('/api/todos', todos);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Server Running on http://localhost:${port}/`))