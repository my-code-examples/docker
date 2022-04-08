async function connect() {
    const { connection } = global
    if (connection && connection.state === 'disconnected') {
        console.log("Retornando conexão existente")
        return connection
    }

    const mysql = require("mysql2/promise")
    const newConnection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    })
    global.connection = newConnection
    console.log("Conectado ao MySQL")
    return newConnection
}

async function selectNames() {
    const conn = await connect()
    const [rows] = await conn.query("SELECT name FROM people;",)
    return rows;
}

async function insertName(name) {
    const conn = await connect()
    const query = "INSERT INTO people(name) VALUES (?);"
    const value = [name]
    await conn.query(query, value)
}

async function tablePeopleExists() {
    const conn = await connect()
    const [rows] = await conn.query("SHOW TABLES LIKE 'people';")
    return rows.length > 0
}

async function createTablePeople() {
    const conn = await connect()
    const query = "CREATE TABLE people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));"
    await conn.query(query)
}

module.exports = {
    selectNames,
    insertName,
    tablePeopleExists,
    createTablePeople
}


