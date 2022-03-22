const res = require('express/lib/response')
const db = require('../../config/db')

//Mostra quantos anos instrutor tem
const { date } = require('../../lib/utils')

module.exports = {
  //Seleciona todos os instrutores, e conta quantos alunos cada instrutor tem
  all(callback) {
    db.query(`SELECT * FROM teachers`, function (err, results) {
      if (err) return res.send('database')

      callback(results.rows)
    })
  },

  //Função que inseri as informações para novos instrutores no banco de dados
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
      if (err) return res.send(req.body)

      callback(results.rows[0])
    })

    // db.query(query, values, function (err, results) {
    //   if (err) throw `Database Error! ${err}`

    // })
  },

  //   //Função que faz a busca de um instrutor único atráves do id
  //   find(id, callback) {
  //     db.query(
  //       `SELECT * FROM instrutores WHERE id = $1`,
  //       [id],
  //       function (err, results) {
  //         if (err) throw `Database Error! ${err}`

  //         callback(results.rows[0])
  //       }
  //     )
  //   },

  //Função que faz o filtro dos instrutores pelo nome
  find(id, callback) {
    db.query(
      `SELECT * FROM teachers WHERE id=$1`,
      [id],
      function (err, results) {
        if (err) return res.send('Database Error')
        callback(results.rows[0])
      }
    )

    // db.query(
    //   `
    //   SELECT instrutores.*, count(membros) AS total_alunos
    //   FROM instrutores
    //   LEFT JOIN membros ON (membros.instrutor_id = instrutores.id)
    //   WHERE instrutores.name ILIKE '%${filter}%'
    //   OR instrutores.services ILIKE '%${filter}%'
    //   GROUP BY instrutores.id
    //   `,

    //   function (err, results) {
    //     if (err) throw `Database Error! ${err}`

    //     callback(results.rows)
    //   }
    // )
  },

  //   //Função que atualiza as informações dos instrutores
  //   update(data, callback) {
  //     const query = `
  //       UPDATE instrutores SET
  //         avatar_url  =($1),
  //         name        =($2),
  //         birth       =($3),
  //         gender      =($4),
  //         services    =($5)

  //       WHERE id      =($6)
  //       `

  //     const values = [
  //       data.avatar_url,
  //       data.name,
  //       date(data.birth).iso,
  //       data.gender,
  //       data.services,
  //       data.id
  //     ]

  //     db.query(query, values, function (err) {
  //       if (err) throw `Database Error! ${err}`

  //       callback()
  //     })
  //   },

  //   delete(id, callback) {
  //     db.query(
  //       `
  //       DELETE FROM instrutores WHERE id = $1`,
  //       [id],
  //       function (err) {
  //         if (err) throw `Database Error! ${err}`

  //         return callback()
  //       }
  //     )
  //   },

  //   //Função que faz a paginação
  //   paginate(params) {
  //     const { filter, limit, offset, callback } = params

  //     let query = '',
  //       filterQuery = '',
  //       totalQuery = `(
  //           SELECT count (*) FROM instrutores
  //         ) AS total`

  //     if (filter) {
  //       filterQuery = `
  //         WHERE instrutores.name ILIKE '%${filter}%'
  //         OR instrutores.services ILIKE '%${filter}%'
  //       `
  //       totalQuery = `(
  //         SELECT count (*) FROM instrutores
  //         ${filterQuery}
  //       ) AS total`
  //     }

  //     query = `
  //       SELECT instrutores.*, ${totalQuery}, count(membros) AS total_alunos
  //       FROM instrutores
  //       LEFT JOIN membros ON (instrutores.id = membros.instrutor_id)
  //       ${filterQuery}
  //       GROUP BY instrutores.id LIMIT $1 OFFSET $2
  //     `
  //     db.query(query, [limit, offset], function (err, results) {
  //       if (err) throw `Database Error! ${err}`

  //       callback(results.rows)
  //     })
  //   }
}
