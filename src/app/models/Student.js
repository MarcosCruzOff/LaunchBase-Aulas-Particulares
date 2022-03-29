const db = require('../../config/db')

//Mostra quantos anos o professor tem
const { date } = require('../../lib/utils')

module.exports = {
  //Seleciona todos os estudantes, e conta quantos alunos cada teacher tem
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
         created_at,
         teacher_id
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING ID
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
      data.created_at,
      data.teacher,
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
      `
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1`,
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
      avatar_url      =($1),
      name            =($2),
      birth_date      =($3),
      email_student   =($4),
      phone           =($5),
      education_level =($6),
      class_type      =($7),
      subjects_taught =($8),
      teacher_id      =($9)
    WHERE id          =($10)    
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
      data.teacher,
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

  selectTeacher(callback) {
    db.query(
      `
      SELECT name, id FROM teachers`,
      function (err, results) {
        if (err) throw `Database Error! ${err}`

        callback(results.rows)
      }
    )
  },

  //Função que faz a paginação
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = '',
      filterQuery = '',
      totalQuery = `(
          SELECT count (*) FROM students
        ) AS total`

    if (filter) {
      filterQuery = `
        WHERE students.name ILIKE '%${filter}%'
        OR students.email ILIKE '%${filter}%'
      `
      totalQuery = `(
        SELECT count (*) FROM students
        ${filterQuery}
      ) AS total`
    }

    query = `
      SELECT students.*, ${totalQuery}
      FROM students
      ${filterQuery}
      LIMIT $1 OFFSET $2
    `
    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
}
