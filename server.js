const express = require('express')
const nunjucks = require('nunjucks')

const teachers = require('./teachers.js')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.set('view engine', 'html')
nunjucks.configure('views', {
   express: server,
   autoescape: false,
   noCache: true
})

server.get('/', function (req, res) {
   return res.redirect('/teachers')
})

server.get('/teachers', teachers.index)

server.get('/teachers/cadastro', function (req, res) {
   return res.render('form')
})

server.post('/teachers', teachers.post)

server.get('/teachers/show/:id', teachers.show)

server.listen(5000, function () {
   console.log('Server on!')
})
