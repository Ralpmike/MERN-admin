const cors = require("cors");
const express = require("express");

const basicMiddleware = (app) => {
  //?cors: Cross-Origin Resource Sharing
  app.use(cors());

  //?Body Parser
  app.use(express.json());

  //?Body Parser
  app.use(express.urlencoded({ extended: true }));

  //?Static Files
  app.use(express.static("public"));
};

module.exports = basicMiddleware;
