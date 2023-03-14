const express = require("express");

const app = express();

const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb://172.17.0.2:27017/curso");

let alunoSchema = mongoose.Schema({
  ra: String,

  nome: String,

  curso: String,
});

let aluno = mongoose.model("aluno", alunoSchema);

app.post("/cadastrar", (req, res) => {
  let dados = new aluno(req.body);

  dados
    .save()

    .then((item) => {
      res.json({ message: "Cadastro realizado com sucesso" });
    })

    .catch((err) => {
      res.json({ message: "Erro no cadastro" });
    });
});

app.delete("/deletar/:id", (req, res) => {
  aluno
    .findByIdAndDelete(req.params.id)
    .then((item) => {
      res.json({ message: "Deletado realizado com sucesso" });
    })

    .catch((err) => {
      res.json({ message: "Erro ao deletar" });
    });
});

app.get("/listar/:id", async (req, res) => {
  const { id } = req.params;
  const alunoOne = await aluno.findById(id);
  if (!alunoOne) {
    res.json({ messge: "Erro ao encontrar aluno" });
  }
  return res.status(200).json(alunoOne);
});

app.put("/alterar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const alunoOne = await aluno.findByIdAndUpdate(id, req.body);

    return res.json({ messge: "alteracao nos dados do aluno" });
  } catch (error) {
    res.json({ messge: "Erro ao encontrar aluno" });
  }
});

app.get("/index", async (req, res) => {
  const alunos = await aluno.find();
  return res.status(200).json(alunos);
});

app.get("/", (req, res) => {
  res.json({ message: "API fucionando..." });
});

app.use(function (req, res, next) {
  res.status(404).json({ message: "Erro 404! Página não encontrada!!!" });
});

app.listen(3000, () => {
  console.log("Servidor ouvindo a porta 3000");
});
