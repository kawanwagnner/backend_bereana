const User = require("../models/message");

const UserController = {
  create: async (req, res) => {
    try {
      const { nome, email, cell, assunto, msg } = req.body;
      const userCriado = await User.create({ nome, email, cell, assunto, msg });

      return res.status(200).json({
        msg: "Mensagem enviada com sucesso!",
        user: userCriado,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Adicione o Suporte" });
    }
  },
};

module.exports = UserController;
