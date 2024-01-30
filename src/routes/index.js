const express = require('express');
const pessoasRouter = require('./pessoasRoutes.js');
const categoriasRouter = require('./categoriasRoutes.js');
const cursosRouter = require('./cursosRoutes.js');

module.exports = (app) => {
  app.use(
    express.json(),
    pessoasRouter,
    categoriasRouter,
    cursosRouter
  );
};