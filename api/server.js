const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')

const usersRouter = require("../users/users-router.js");
const authRouter = require ('../auth/router.js')
const restricted= require('../auth/restricted-middleware.js')

const server = express();

const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, 
    httpOnly: true, 
  },
  resave: false, 
  saveUninitialized: true, 

}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use("/api/users", restricted, checkRole("user"), usersRouter);
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;

function checkRole(role) {
    return (req, res, next) => {
      if (
        req.decodedToken &&
        req.decodedToken.role &&
        req.decodedToken.role.toLowerCase() === role
      ) {
        next();
      } else {
        res.status(403).json({ you: "Shall not pass!" });
      }
    };
  }