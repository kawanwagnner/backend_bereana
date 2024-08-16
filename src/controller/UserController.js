const User = require("../models/message");

const UserController = {
  // Create - Cria um novo usuário/mensagem
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

  // Read - Lê todas as mensagens
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Adicione o Suporte" });
    }
  },

  // Read - Lê uma mensagem específica por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ msg: "Mensagem não encontrada" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Adicione o Suporte" });
    }
  },

  // Update - Atualiza uma mensagem por ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, cell, assunto, msg } = req.body;

      const userAtualizado = await User.findByIdAndUpdate(
        id,
        { nome, email, cell, assunto, msg },
        { new: true } // Retorna o documento atualizado
      );

      if (!userAtualizado) {
        return res.status(404).json({ msg: "Mensagem não encontrada" });
      }

      return res.status(200).json({
        msg: "Mensagem atualizada com sucesso!",
        user: userAtualizado,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Adicione o Suporte" });
    }
  },

  // Delete - Deleta uma mensagem por ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const userDeletado = await User.findByIdAndDelete(id);

      if (!userDeletado) {
        return res.status(404).json({ msg: "Mensagem não encontrada" });
      }

      return res.status(200).json({ msg: "Mensagem deletada com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Adicione o Suporte" });
    }
  },
};

module.exports = UserController;
