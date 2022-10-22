const express = require("express");
const server = express();

server.use(express.static("public"))

server.all("/", (req, res) => {
  res.send("Бот запускается")
  res.sendFile(`${__dirname}/public/index.html`)
})

function keepAlive() {
  server.listen(process.env.PORT, () => {
    console.log("Сервер готов")
  })
}

module.exports = keepAlive