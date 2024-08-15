const express = require("express");
const router = require("./router/router");
const sequelize = require("./config/config");
const app = express();

const User = require("./models/User");

// Modelo da API JSON
app.use(express.json());
app.use("/api/user", router);
// Req -> A requisição, ou seja, o que recebe do servidor
// Res -> O Response, é o que enviamos ao servidor
app.get("/healthcheck", (req, res) => {
  return res.status(200).json({
    msg: "Estamos Vivos!",
    alive: true,
  });
});

// Listen -> Ouvir o servidor na porta 8080
sequelize
  .authenticate()
  .then(async () => {
    console.log("Conexão estabelecida com sucesso!");
    await sequelize.sync();
  })
  .then(() => {
    app.listen(8080, () => {
      console.log(
        "O servidor está rondando na porta 8080. http:// 127.0.0.1:8080"
      );
    });
  })
  .catch((error) => {
    console.error("Erro ao se conectar com  o banco: ", error);
  });
