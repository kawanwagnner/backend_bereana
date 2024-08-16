const User = require("../models/User");

const UserController = {
  create: async (req, res) => {
    try {
      const { nome, email, cell, assunto, msg } = req.body;
      const userCriado = await User.create({ nome, email, cell, assunto, msg });

      return res.status(200).json({
        msg: "Usuário criado com sucesso!",
        user: userCriado,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Adicione o Suporte" });
    }
  },
};

module.exports = UserController;
