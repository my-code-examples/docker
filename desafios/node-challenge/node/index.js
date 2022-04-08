const express = require("express")
const db = require("./db")

const app = express()
const port = 3000

app.get("/", async (req, res) => {
  const names = await db.selectNames()

  function returnNamesHTML() {
    let html =
      `<h1>FullCycle Rocks!<h1>    
       <p>Para adicionar um novo valor no banco de dados, faça uma request para /add/:name</p>
       <h3>Tabela People - MySql</h3><ol>`
    names.map(name => { html += `<li>${name.name}</li>` })
    html += `</ol>`
    return html
  }

  res.send(returnNamesHTML())
})

app.get("/add/:name", async (req, res) => {
  const name = req.params.name
  await db.insertName(name)
  res.send(`<h1>${name} adicionado!</h1>`)
})

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})
