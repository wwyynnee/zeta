const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send("Бот запускается")
})

function keepAlive() {
  server.listen(process.env.PORT, () => {
    console.log("Сервер готов")
  })
}

module.exports = keepAlive