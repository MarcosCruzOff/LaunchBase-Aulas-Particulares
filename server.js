const express = require('express');
const nunjucks = require('nunjucks');

const teachers = require('./teachers.js');
const methodOverride = require('method-override');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'));

server.set('view engine', 'njk');
nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get('/', function (req, res) {
  return res.redirect('/teachers');
});

server.get('/teachers', teachers.index);

server.get('/teachers/create', teachers.create);

server.post('/teachers', teachers.post);

server.get('/teachers/:id', teachers.show);

server.get('/teachers/:id/edit', teachers.edit);

server.put('/teachers', teachers.put);

server.delete('/teachers', teachers.delete);

server.listen(5000, function () {
  console.log('Server on!');
});
