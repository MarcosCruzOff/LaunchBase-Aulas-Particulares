const Teacher = require('../models/Teacher')
const { date, age } = require('../../lib/utils')
const db = require('../../config/db')

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
      callback(teachers) {
        // const pagination = {
        //   total: Math.ceil(teachers[0].total / limit),
        //   page,
        // }

        // return res.render('teachers/index', {
        //   teachers,
        //   pagination,
        //   filter,
        // })
        if (teachers[0]) {
          const pagination = {
            total: Math.ceil(teachers[0].total / limit),
            page,
          }
          return res.render('teachers/index', {
            teachers,
            pagination,
            filter,
          })
        } else {
          return res.render(`teachers/index`)
        }
      },
    }

    Teacher.paginate(params)
  },

  //Renderiza a página de criar cadastro
  create(req, res) {
    return res.render('teachers/create')
  },

  //Exporta a função de salvar cadastro
  post(req, res) {
    // kyes retorna um Array["avatar_url","name","birth","education","services"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '')
        return res.send('Por favor, Preencha todos os campos')
    }

    Teacher.create(req.body, function (teacher) {
      return res.redirect(`/teachers/${teacher.id}`)
    })
  },

  //Exporta a função que exibi o usuários pelo id show
  show(req, res) {
    Teacher.find(req.params.id, function (teacher) {
      if (!teacher) return res.send('Techer not Found')

      teacher.age = age(teacher.birth_date)
      teacher.class_type = teacher.class_type.split(',')
      teacher.created_at = date(teacher.created_at).format

      return res.render('teachers/show', { teacher })
    })
  },

  //Exporta a função que edita os dados do usuários
  edit(req, res) {
    Teacher.find(req.params.id, function (teacher) {
      if (!teacher) return res.send('Techer not Found')

      teacher.birth_date = date(teacher.birth_date).iso

      // teacher.created_at = date(teacher.created_at).format

      return res.render('teachers/edit', { teacher })
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

    Teacher.update(req.body, function () {
      return res.redirect(`/teachers/${req.body.id}`)
    })
  },

  //Delete
  delete(req, res) {
    Teacher.delete(req.body.id, function () {
      return res.redirect(`/teachers`)
    })
  },
}
