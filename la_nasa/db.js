const { Pool } = require('pg')

// creamos nuestro pool de conexiones
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'nasa',
  password: '1005',
  max: 12,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

/* Obtengo un usuario por su email, o undefined si este no existe en la tabla "users" */
async function get_user(email) {
  const client = await pool.connect()

  const { rows } = await client.query({
    text: 'select * from users where email=$1',
    values: [email]
  })

  client.release()

  if (rows.length > 0) {
    return rows[0]
  }
  return undefined
}

async function create_user(email, name, password) {
  const client = await pool.connect()

  await client.query({
    text: 'insert into users (email, name, password) values ($1, $2, $3)',
    values: [email, name, password]
  })

  client.release()
}





module.exports = {
  get_user,
  create_user
}
