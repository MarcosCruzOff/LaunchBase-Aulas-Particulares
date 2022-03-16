const express = require('express')
const router = express.Router()
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

router.get('/', function (req, res) {
  return res.redirect('/teachers')
})

router.get('/teachers', teachers.index)

router.get('/teachers/create', teachers.create)

router.post('/teachers', teachers.post)

router.get('/teachers/:id', teachers.show)

router.get('/teachers/:id/edit', teachers.edit)

router.put('/teachers', teachers.put)

router.delete('/teachers', teachers.delete)

// ========================Students===================================

router.get('/students', students.index)

router.get('/students/create', students.create)

router.post('/students', students.post)

router.get('/students/:id', students.show)

router.get('/students/:id/edit', students.edit)

router.put('/students', students.put)

router.delete('/students', students.delete)

module.exports = router
