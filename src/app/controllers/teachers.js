const { date } = require('../../lib/utils')
const db = require('../../config/db.js')

module.exports = {
  //Exporta a função que mostra a página index
  index(req, res) {
    return res.render('teachers/index')
  },

  //Renderiza a página de criar cadastro
  create(req, res) {
    return res.render('teachers/create')
  },

  //Exporta a função de criar cadastro
  post(req, res) {
    // kyes retorna um Array["avatar_url","name","birth","education","services"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '')
        return res.send('Por favor, Preencha todos os campos')
    }

    const query = `
      INSERT INTO teachers(
        avatar_url, 
        name, 
        birth_date, 
        education_level, 
        class_type, 
        subjects_taught,
        created_at
      ) VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
      `
    const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth_date).iso,
      req.body.education_level,
      req.body.class_type,
      req.body.subjects_taught,
      date(Date.now()).iso,
    ]

    db.query(query, values, function (err, results) {
      if (err) return res.send(req.body)

      return res.redirect(`/teachers/${results.rows[0].id}`)
    })
  },

  //Exporta a função que exibi o usuários pelo id show
  show(req, res) {
    return
  },

  //Exporta a função que edita os dados do usuários
  edit(req, res) {
    return
  },

  //Exporta a função que atualizar dados dos usuários
  put(req, res) {
    // kyes retorna um Array["avatar_url","name","birth","education","services"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '')
        return res.send('Por favor, Preencha todos os campos')
    }

    return
  },

  //Delete
  delete(req, res) {
    return
  },
}
