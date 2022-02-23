const fs = require('fs')
const database = require('./database.json')

exports.index = function (req, res) {
   return res.render('index', { teachers: database.teachers })
}

exports.post = function (req, res) {
   // kyes retorna um Array["avatar_url","name","birth","gender","services"]
   const keys = Object.keys(req.body)

   for (let key of keys) {
      if (req.body[key] == '')
         return res.send('Por favor, Preencha todos os campos')
   }

   // Destruturando o req.body
   let { avatar_url, nome, idade, escolaridade, modalidade, materia } = req.body

   const id = Number(database.teachers.length)

   database.teachers.push({
      id,
      avatar_url,
      nome,
      idade,
      escolaridade,
      modalidade,
      materia
   })

   fs.writeFile(
      'database.json',
      JSON.stringify(database, null, 2),
      function (err) {
         if (err) return res.send('Write file error!')

         return res.redirect('/main')
      }
   )
}
