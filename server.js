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
   return res.redirect('/main')
})

server.get('/main', function (req, res) {
   return res.render('index')
})

server.get('/main/cadastro', function (req, res) {
   return res.render('form')
})

server.post('/main', teachers.post)

server.listen(5000, function () {
   console.log('Server on!')
})
