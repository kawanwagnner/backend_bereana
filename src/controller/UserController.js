const Joi = require("joi");
const User = require("../models/message");

// Definição do schema de validação
const userSchema = Joi.object({
  nome: Joi.string().min(3).max(30).required().messages({
    "string.empty": `"Nome" não pode estar vazio`,
    "string.min": `"Nome" deve ter no mínimo {#limit} caracteres`,
    "string.max": `"Nome" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Nome" é um campo obrigatório`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `"E-mail" não pode estar vazio`,
    "string.email": `"E-mail" deve ser um e-mail válido`,
    "any.required": `"E-mail" é um campo obrigatório`,
  }),
  cell: Joi.string().min(10).max(15).required().messages({
    "string.empty": `"Celular" não pode estar vazio`,
    "string.min": `"Celular" deve ter no mínimo {#limit} caracteres`,
    "string.max": `"Celular" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Celular" é um campo obrigatório`,
  }),
  assunto: Joi.string().min(3).max(30).required().messages({
    "string.empty": `"Assunto" não pode estar vazio`,
    "string.min": `"Assunto" deve ter no mínimo {#limit} caracteres`,
    "string.max": `"Assunto" deve ter no máximo {#limit} caracteres`,
    "any.required": `"Assunto" é um campo obrigatório`,
  }),
  msg: Joi.string().min(10).max(150).required().messages({
    "string.empty": `"Mensagem" não pode estar vazia`,
    "string.min": `"Mensagem" deve ter no mínimo 10 caracteres`,
    "string.max": `"Mensagem" deve ter no máximo 150 caracteres`,
    "any.required": `"Mensagem" é um campo obrigatório`,
  }),
});

const UserController = {
  create: async (req, res) => {
    try {
      // Validação dos dados de entrada
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: error.details[0].message });
      }

      const { nome, email, cell, assunto, msg } = value;
      const userCriado = await User.create({ nome, email, cell, assunto, msg });

      return res.status(200).json({
        msg: "Sua mensagem foi enviada com sucesso!",
        user: userCriado,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Erro no servidor. Adicione o suporte." });
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
      // Validação dos dados de entrada
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ msg: error.details[0].message });
      }

      const { id } = req.params;
      const { nome, email, cell, assunto, msg } = value;

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
