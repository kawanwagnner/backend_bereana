const { Router } = require("express");
const UserController = require("../controller/UserController");

const router = Router();

// Configurar as rotas (CRUD);

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
