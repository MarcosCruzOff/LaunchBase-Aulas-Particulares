const { age, date } = require('../../lib/utils')

module.exports = {
  //Exporta a função que mostra a página index
  index(req, res) {
    return res.render('students/index')
  },

  //Renderiza a página de criar cadastro
  create(req, res) {
    return res.render('students/create')
  },

  //Exporta a função de criar cadastro
  post(req, res) {
    // kyes retorna um Array["avatar_url","name","birth","education","services"]
    const keys = Object.keys(req.body)

    for (let key of keys) {
      if (req.body[key] == '')
        return res.send('Por favor, Preencha todos os campos')
    }

    // Destruturando o req.body
    let { avatar_url, name, birth, education, class_type, subjects_taught } =
      req.body

    return
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
