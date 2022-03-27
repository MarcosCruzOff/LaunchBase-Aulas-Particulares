const Student = require('../models/Student')
const { date, age } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  //Exporta a função que mostra a página index
  index(req, res) {
    Student.all(function (students) {
      return res.render('students/index', { students })
    })
  },

  //Renderiza a página de criar cadastro
  create(req, res) {
    return res.render('students/create')
  },

  //Exporta a função de salvar cadastro
  post(req, res) {
    // kyes retorna um Array["avatar_url","name","birth","education","services"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '')
        return res.send('Por favor, Preencha todos os campos')
    }

    Student.create(req.body, function (student) {
      return res.redirect(`/students/${student.id}`)
    })
  },

  //Exporta a função que exibi o usuários pelo id show
  show(req, res) {
    Student.find(req.params.id, function (student) {
      if (!student) return res.send('Techer not Found')

      student.age = age(student.birth_date)
      student.class_type = student.class_type.split(',')
      student.created_at = date(student.created_at).format

      return res.render('students/show', { student })
    })
  },

  //Exporta a função que edita os dados do usuários
  edit(req, res) {
    Student.find(req.params.id, function (student) {
      if (!student) return res.send('Techer not Found')

      student.birth_date = date(student.birth_date).iso

      // student.created_at = date(student.created_at).format

      return res.render('students/edit', { student })
    })
  },

  //Exporta a função que atualizar dados dos usuários
  put(req, res) {
    // kyes retorna um Array["avatar_url","name","birth","education","services"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '')
        return res.send('Por favor, Preencha todos os campos')
    }

    Student.update(req.body, function () {
      return res.redirect(`/students/${req.body.id}`)
    })
  },

  //Delete
  delete(req, res) {
    Student.delete(req.body.id, function () {
      return res.redirect(`/students`)
    })
  },
}
