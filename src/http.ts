import express, { response } from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//Rota de teste
app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
})

app.get("/pages/admin", (request, response) => {
  return response.render("html/admin.html");
})

/**
 * Conceito conexão Websocket

  Protocolo WS

  Cliente conecta ao servidor e a conexão fica aberta durante todo o tempo de comunicação(bidirecional) - É gerado o ID da conexão

  Algumas bibliotecas: Socketio
 */

const http = createServer(app); //Criando protocolo http
const io = new Server(http); //Criação protocolo ws

io.on("connection", (socket: Socket) => {
  console.log("Se conectou", socket.id);
})

app.use(express.json()); //Habilitar Json

app.use(routes);

export { http, io }