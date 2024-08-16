const express = require("express");
const router = require("./router/router");
const app = express();

const User = require("./models/User");

// Modelo da API JSON
app.use(express.json());
app.use("/api/message", router);
// Req -> A requisição, ou seja, o que recebe do servidor
// Res -> O Response, é o que enviamos ao servidor
app.get("/healthcheck", (req, res) => {
  return res.status(200).json({
    msg: "Estamos Vivos!",
    alive: true,
  });
});

// Listen -> Ouvir o servidor na porta 8080
connectDatabase()
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err);
  });
