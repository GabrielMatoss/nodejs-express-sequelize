const express = require('express');
const pessoasRouter = require('./pessoasRoutes.js');

module.exports = (app) => {
  app.use(
    express.json(),
    pessoasRouter
  );
};