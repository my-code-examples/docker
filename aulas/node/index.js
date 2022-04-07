const express = require("express")
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Roger Oliveira')`
connection.query(sql)
const result = connection.query(sql)
connection.end()

app.get("/", (req, res) => {
  res.send(`<h1>Node using Docker and Mysql</h1>`)
})

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})


