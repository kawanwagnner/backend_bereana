const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const { connectDatabase } = require("./config/config");
const app = express();

const PORT = process.env.PORT || 8080; // Define a porta 8080 ou usa uma porta definida nas variáveis de ambiente

const User = require("./models/message");

// Configurar CORS
app.use(
  cors({
    origin: "*", // ou "*" para permitir todas as origens
  })
);

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
