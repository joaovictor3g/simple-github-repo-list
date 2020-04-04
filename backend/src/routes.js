const express = require('express');

const routes = express.Router();
const userController = require('./controllers/userControllers');

routes.post('/', userController.index);
routes.get('/list/:id', userController.listRepos);

module.exports = routes;