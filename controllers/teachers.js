const fs = require('fs');
const database = require('../database.json');
const { age, date } = require('../utils');

exports.index = function (req, res) {
  return res.render('teachers/index', { teachers: database.teachers });
};

exports.post = function (req, res) {
  // kyes retorna um Array["avatar_url","name","birth","gender","services"]
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (req.body[key] == '')
      return res.send('Por favor, Preencha todos os campos');
  }

  // Destruturando o req.body
  let { avatar_url, nome, idade, escolaridade, modalidade, materia } = req.body;

  const criado_em = Date.now();

  const id = Number(database.teachers.length);

  database.teachers.push({
    id,
    avatar_url,
    nome,
    idade,
    escolaridade,
    modalidade,
    materia,
    criado_em,
  });

  fs.writeFile(
    'database.json',
    JSON.stringify(database, null, 2),
    function (err) {
      if (err) return res.send('Write file error!');

      return res.redirect('/teachers');
    }
  );
};

//Exporta a função de criar cadastro
exports.create = function (req, res) {
  return res.render('teachers/create');
};

//Exporta a função que exibi o usuários pelo id show
exports.show = function (req, res) {
  //req.params.id = /:id
  const { id } = req.params;

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "teachers"
  const findTeacher = database.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!findTeacher) return res.send('Professor não encontrado');

  const teacher = {
    ...findTeacher,
    idade: age(findTeacher.idade),
    materia: findTeacher.materia.split(','),
    criado_em: new Intl.DateTimeFormat('pt-BR').format(findTeacher.criado_em),
  };

  //Renderiza a pagina show e envia os dados que a variável findTeacher
  //buscou do data.JSON para o front-end
  return res.render('teachers/show', { teacher });
};

//Exporta a função que edita os dados do usuários
exports.edit = function (req, res) {
  //req.params.id = /:id
  const { id } = req.params;

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "teachers"
  const findTeacher = database.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!findTeacher) return res.send('Professor não encontrado');

  //Retorna day--month--year
  const teacher = {
    ...findTeacher,
    idade: date(findTeacher.idade).iso,
  };

  return res.render('teachers/edit', { teacher });
};

//Exporta a função que atualizar dados dos usuários
exports.put = function (req, res) {
  //req.body.id = /:id
  const { id } = req.body;

  let index = 0;

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "professores"
  const findTeacher = database.teachers.find(function (teacher, findIndex) {
    if (teacher.id == id) {
      index = findIndex;
      return true;
    }
  });

  if (!findTeacher) return res.send('teacher não encontrado');

  const teacher = {
    ...findTeacher,
    ...req.body,
    idade: Date.parse(req.body.idade),
    id: Number(req.body.id),
  };

  database.teachers[index] = teacher;

  fs.writeFile(
    'database.json',
    JSON.stringify(database, null, 2),
    function (err) {
      if (err) return res.send('Write error');

      return res.redirect(`/teachers/${id}`);
    }
  );
};

//Delete
exports.delete = function (req, res) {
  //
  const { id } = req.body;

  //
  const filterTeacher = database.teachers.filter(function (teacher) {
    return teacher.id != id;
  });

  database.teachers = filterTeacher;

  fs.writeFile(
    'database.json',
    JSON.stringify(database, null, 2),
    function (err) {
      if (err) return res.send('write Error');

      return res.redirect('/teachers');
    }
  );
};
