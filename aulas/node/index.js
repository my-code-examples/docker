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

// const sql = `INSERT INTO people(name) values ('Roger Oliveira')`
//connection.query(sql)
//const result = connection.query(sql)
//connection.end()

let result = ""

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT name FROM people WHERE name LIKE 'roger%'", function (err, queryResult, fields) {
    if (err) throw err;
    result = Object.values(JSON.parse(JSON.stringify(queryResult)));
  });
});

app.get("/", (req, res) => {
    res.send(`<h1>Node using Docker and Mysql - ${result[0].name} </h1>`)
})

app.listen(port, () => {
	console.log(`Server rodando na porta ${port}`)
})


