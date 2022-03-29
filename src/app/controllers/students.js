const Student = require('../models/Student')
const { date, age } = require('../../lib/utils')

module.exports = {
  //Exporta a função que mostra a página index
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page,
        }

        return res.render('students/index', {
          students,
          pagination,
          filter,
        })
      },
    }

    Student.paginate(params)
  },

  //Renderiza a página de criar cadastro
  create(req, res) {
    Student.selectTeacher(function (options) {
      return res.render('students/create', { teachersOptions: options })
    })
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
      if (!student) return res.send('Student not Found')

      student.age = age(student.birth_date)

      return res.render('students/show', { student })
    })
  },

  //Exporta a função que edita os dados do usuários
  edit(req, res) {
    Student.find(req.params.id, function (student) {
      if (!student) return res.send('Student not Found')

      student.birth_date = date(student.birth_date).iso

      Student.selectTeacher(function (options) {
        return res.render('students/edit', {
          student,
          teachersOptions: options,
        })
      })
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
