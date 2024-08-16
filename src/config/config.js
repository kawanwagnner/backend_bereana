const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

async function connectDatabase() {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    console.error(
      "Erro: MONGODB_URI não foi definida nas variáveis de ambiente."
    );
    process.exit(1); // Finaliza a aplicação com um erro
  }

  console.log(`Tentando conectar ao MongoDB com a URI: ${dbUri}`);

  try {
    await mongoose.connect(dbUri); // Conectando sem as opções obsoletas
    console.log("Conectado ao MongoDB com sucesso");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Finaliza a aplicação em caso de erro na conexão
  }
}

module.exports = { connectDatabase };
