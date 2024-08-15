const { Router } = require("express");
const UserController = require("../controller/UserController");

const router = Router();

// Configurar as rotas (CRUD);

router.post("/", (req, res) => {
  UserController.create(req, res);
});

module.exports = router;
