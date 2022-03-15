const express = require('express')
const nunjucks = require('nunjucks')

const teachers = require('./app/controllers/teachers.js')
const students = require('./app/controllers/students.js')
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))

server.set('view engine', 'njk')
nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true,
})

server.get('/', function (req, res) {
  return res.redirect('/teachers')
})

server.get('/teachers', teachers.index)

server.get('/teachers/create', teachers.create)

server.post('/teachers', teachers.post)

server.get('/teachers/:id', teachers.show)

server.get('/teachers/:id/edit', teachers.edit)

server.put('/teachers', teachers.put)

server.delete('/teachers', teachers.delete)

// ========================Students===================================

server.get('/students', students.index)

server.get('/students/create', students.create)

server.post('/students', students.post)

server.get('/students/:id', students.show)

server.get('/students/:id/edit', students.edit)

server.put('/students', students.put)

server.delete('/students', students.delete)

server.listen(5000, function () {
  console.log('Server on!')
})
