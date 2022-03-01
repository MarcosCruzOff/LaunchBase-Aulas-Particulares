const fs = require('fs');
const database = require('../database.json');
const { age, date } = require('../utils');

exports.index = function (req, res) {
  return res.render('students/index', { students: database.students });
};

exports.post = function (req, res) {
  // kyes retorna um Array["avatar_url","name","birth","gender","services"]
  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (req.body[key] == '')
      return res.send('Por favor, Preencha todos os campos');
  }

  // Destruturando o req.body
  let { avatar_url, name, email, birth, escolaridade, hora } = req.body;

  const id = Number(database.students.length);

  database.students.push({
    id,
    avatar_url,
    name,
    email,
    birth,
    escolaridade,
    hora,
  });

  fs.writeFile(
    'database.json',
    JSON.stringify(database, null, 2),
    function (err) {
      if (err) return res.send('Write file error!');

      return res.redirect('/students');
    }
  );
};

//Exporta a função de criar cadastro
exports.create = function (req, res) {
  return res.render('students/create');
};

//Exporta a função que exibi o usuários pelo id show
exports.show = function (req, res) {
  //req.params.id = /:id
  const { id } = req.params;

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "students"
  const findStudent = database.students.find(function (student) {
    return student.id == id;
  });

  if (!findStudent) return res.send('Professor não encontrado');

  const student = {
    ...findStudent,
    birth: age(findStudent.birth),
  };

  //Renderiza a pagina show e envia os dados que a variável findStudent
  //buscou do data.JSON para o front-end
  return res.render('students/show', { student });
};

//Exporta a função que edita os dados do usuários
exports.edit = function (req, res) {
  //req.params.id = /:id
  const { id } = req.params;

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "students"
  const findStudent = database.students.find(function (student) {
    return student.id == id;
  });

  if (!findStudent) return res.send('Professor não encontrado');

  //Retorna day--month--year
  const student = {
    ...findStudent,
    birth: date(findStudent.birth).iso,
  };

  return res.render('students/edit', { student });
};

//Exporta a função que atualizar dados dos usuários
exports.put = function (req, res) {
  //req.body.id = /:id
  const { id } = req.body;

  let index = 0;

  //Variável que busca dentro do arquivo data.JSON o Arry de objeto "professores"
  const findStudent = database.students.find(function (student, findIndex) {
    if (student.id == id) {
      index = findIndex;
      return true;
    }
  });

  if (!findStudent) return res.send('student não encontrado');

  const student = {
    ...findStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  database.students[index] = student;

  fs.writeFile(
    'database.json',
    JSON.stringify(database, null, 2),
    function (err) {
      if (err) return res.send('Write error');

      return res.redirect(`/students/${id}`);
    }
  );
};

//Delete
exports.delete = function (req, res) {
  //
  const { id } = req.body;

  //
  const filterStudent = database.students.filter(function (student) {
    return student.id != id;
  });

  database.students = filterStudent;

  fs.writeFile(
    'database.json',
    JSON.stringify(database, null, 2),
    function (err) {
      if (err) return res.send('write Error');

      return res.redirect('/students');
    }
  );
};
