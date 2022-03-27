const db = require('../../config/db')

//Mostra quantos anos o professor tem
const { date } = require('../../lib/utils')

module.exports = {
  //Seleciona todos os estudantes, e conta quantos alunos cada instrutor tem
  all(callback) {
    db.query(`SELECT * FROM students`, function (err, results) {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },

  //Função que inseri as informações para novos estudantes no banco de dados
  create(data, callback) {
    const query = `
      INSERT INTO students(
         avatar_url, 
         name, 
         birth_date,
         email_student,
         phone,
         education_level, 
         class_type, 
         subjects_taught,
         created_at
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
      `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.email_student,
      data.phone,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      date(Date.now()).iso,
    ]

    //Envia as informações para o banco de dados caso não aja erro
    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },

  //Função que faz o filtro dos estudantes pelo nome
  find(id, callback) {
    db.query(
      `SELECT * FROM students WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error! ${err}`

        callback(results.rows[0])
      }
    )
  },

  //Função que faz o filtro dos estudantes pelo nome
  update(data, callback) {
    const query = `
    UPDATE students SET
      avatar_url  =($1),
      name  =($2),
      birth_date  =($3),
      email_student  =($4),
      phone  =($5),
      education_level =($6),
      class_type  =($7),
      subjects_taught =($8)
    WHERE id = $9    
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.email_student,
      data.phone,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      data.id,
    ]

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`

      callback()
    })
  },

  //Função que faz o filtro dos estudantes pelo nome
  delete(id, callback) {
    db.query(
      `DELETE FROM students WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error! ${err}`

        return callback()
      }
    )
  },
}
