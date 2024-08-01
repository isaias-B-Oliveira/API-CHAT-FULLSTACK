const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const app = express();

const Usuario = require("./models/Usuario");
const Mensagem = require("./models/Mensagem");
const Sala = require("./models/Sala");

const { json } = require("sequelize");

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-PINGOTHER, Content-Type, Authorization"
    );
    app.use(cors());
    next();
});

app.get("/", function (req, res) {
    res.send("primeira rota");
});

app.post("/cadastra-mensagem", async (req, res) => {
    //var dados = req.body;
    await Mensagem.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Mensagen Cadastrada com susseço",
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Mensagen não Cadastrado",
            });
        });
});

app.post("/cadastra-sala", async (req, res) => {
    //var dados = req.body;
    await Sala.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Sala Cadastrada com susseço",
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Sala não Cadastrado",
            });
        });
});

app.post("/cadastra-user", async (req, res) => {
    var dados = req.body;

    const usuario = await Usuario.findOne({
        where: {
            email: dados.email,
        },
    });
    if (usuario) {
        return res.status(400).json({
            erro: true,
            mensagem: "ERRO: Email ja cadastrado",
        });
    }

    await Usuario.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuario Cadastrado com susseço",
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Usuario não Cadastrado",
            });
        });
});

app.post("/validar-acesso", async (req, res) => {
    const usuario = await Usuario.findOne({
        attributes: ["id", "nome"],
        where: {
            email: req.body.email,
        },
    });

    if (usuario == null) {
        return res.status(400).json({
            erro: true,
            mensagem: "ERRO: Usuario nao encontrado",
        });
    }
    return res.json({
        erro: false,
        mensagem: "Login realisado com susseço",
        dadosUsuario: usuario,
    });
});

const serve = app.listen(8080, () => {
    console.log("serve running : http://localhost:8080");
});

io = socket(serve, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("sala_conectar", (dados) => {
        console.log("sala selecionada: " + dados);
        socket.join(dados);
    });

    socket.on("enviar_mensagem", (dados) => {
        console.log(dados);
        Mensagem.create({
            mensagem: dados.conteudo.mensagem,
            salaId: dados.sala,
            usuarioId: dados.conteudo.usuario.id,
        });
        socket.to(dados.sala).emit("receber_mensagem", dados.conteudo);
    });
});
