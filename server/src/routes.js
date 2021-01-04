const express = require('express');
const TeamController = require('./controllers/TeamController');
const MemberController = require('./controllers/MemberController');

const routes = express.Router();

routes.get('/teams', TeamController.index);
routes.post('/teams', TeamController.store);

routes.get('/teams/:teamId/members', MemberController.index);
routes.post('/teams/:teamId/members', MemberController.store);

routes.get('/', (req, res) => {
  return res.json({hello:'world'});
})

module.exports = routes;