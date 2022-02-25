const fs = require('fs')
const database = require('./database.json')
const { age, date } = require('./utils')

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

   const criado_em = Date.now()

   const id = Number(database.teachers.length)

   database.teachers.push({
      id,
      avatar_url,
      nome,
      idade,
      escolaridade,
      modalidade,
      materia,
      criado_em
   })

   fs.writeFile(
      'database.json',
      JSON.stringify(database, null, 2),
      function (err) {
         if (err) return res.send('Write file error!')

         return res.redirect('/teachers')
      }
   )
}

//Exporta a função que exibi o usuários pelo id show
exports.show = function (req, res) {
   //req.params.id = /:id
   const { id } = req.params

   //Variável que busca dentro do arquivo data.JSON o Arry de objeto "professores"
   const encontrarProfessor = database.teachers.find(function (professor) {
      return professor.id == id
   })

   if (!encontrarProfessor) return res.send('Professor não encontrado')

   const professor = {
      ...encontrarProfessor,
      idade: age(encontrarProfessor.idade),
      materia: encontrarProfessor.materia.split(','),
      criado_em: new Intl.DateTimeFormat('pt-BR').format(
         encontrarProfessor.criado_em
      )
   }

   //Renderiza a pagina show e envia os dados que a variável encontrarProfessor
   //buscou do data.JSON para o front-end
   return res.render('show', { professor })
}

//Exporta a função que edita os dados do usuários
exports.edit = function (req, res) {
   //req.params.id = /:id
   const { id } = req.params

   //Variável que busca dentro do arquivo data.JSON o Arry de objeto "professores"
   const encontrarProfessor = data.professores.find(function (professor) {
      return professor.id == id
   })

   if (!encontrarProfessor) return res.send('professor não encontrado')

   //Retorna day--month--year
   const professor = {
      ...encontrarProfessor,
      idade: date(encontrarProfessor.idade).iso
   }

   return res.render('professores/edit', { professor })
}

//Exporta a função que atualizar dados dos usuários
exports.put = function (req, res) {
   //req.body.id = /:id
   const { id } = req.body

   let index = 0

   //Variável que busca dentro do arquivo data.JSON o Arry de objeto "professores"
   const encontrarProfessor = data.professores.find(function (
      professor,
      encontarIndex
   ) {
      if (professor.id == id) {
         index = encontarIndex
         return true
      }
   })

   if (!encontrarProfessor) return res.send('professor não encontrado')

   const professor = {
      ...encontrarProfessor,
      ...req.body,
      idade: Date.parse(req.body.idade),
      id: Number(req.body.id)
   }

   data.professores[index] = professor

   fs.writeFile('database.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write error')

      return res.redirect(`/professores/${id}`)
   })
}
