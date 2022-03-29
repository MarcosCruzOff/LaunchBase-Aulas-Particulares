const db = require('../../config/db')

//Mostra quantos anos o professor tem
const { date } = require('../../lib/utils')

module.exports = {
  //Seleciona todos os professores, e conta quantos alunos cada instrutor tem
  all(callback) {
    db.query(
      `
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        GROUP BY teachers.id
      `,

      function (err, results) {
        if (err) throw `Database Error! ${err}`

        callback(results.rows)
      }
    )
  },

  //Função que inseri as informações para novos professores no banco de dados
  create(data, callback) {
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
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
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

  //Função que faz o filtro dos professores pelo nome
  find(id, callback) {
    db.query(
      `SELECT * FROM teachers WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error! ${err}`

        callback(results.rows[0])
      }
    )
  },

  //Função que faz o filtro dos teachers pelo nome
  findBy(filter, callback) {
    db.query(
      `
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.class_types ILIKE '%${filter}%'
      GROUP BY teachers.id
      `,

      function (err, results) {
        if (err) throw `Database Error! ${err}`

        callback(results.rows)
      }
    )
  },

  //Função que faz o filtro dos professores pelo nome
  update(data, callback) {
    const query = `
    UPDATE teachers SET
      avatar_url      =($1),
      name            =($2),
      birth_date      =($3),
      education_level =($4),
      class_type      =($5),
      subjects_taught =($6)
    WHERE id = $7    
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
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

  //Função que faz o filtro dos professores pelo nome
  delete(id, callback) {
    db.query(
      `DELETE FROM teachers WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error! ${err}`

        return callback()
      }
    )
  },

  //Função que faz a paginação
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = '',
      filterQuery = '',
      totalQuery = `(
          SELECT count (*) FROM teachers
        ) AS total`

    if (filter) {
      filterQuery = `
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.class_types ILIKE '%${filter}%'
      `
      totalQuery = `(
        SELECT count (*) FROM teachers
        ${filterQuery}
      ) AS total`
    }

    query = `
      SELECT teachers.*, ${totalQuery}, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (teachers.id = students.teacher_id)
      ${filterQuery}
      GROUP BY teachers.id LIMIT $1 OFFSET $2
    `
    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
}
