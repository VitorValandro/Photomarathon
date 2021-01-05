const express = require('express');
const TeamController = require('./controllers/TeamController');
const MemberController = require('./controllers/MemberController');
const ThemeController = require('./controllers/ThemeController');
const SubthemeController = require('./controllers/SubthemeController');

const routes = express.Router();

routes.get('/teams', TeamController.index);
routes.post('/teams', TeamController.store);
routes.delete('/teams/:teamId', TeamController.remove);

routes.get('/teams/:teamId/members', MemberController.index);
routes.post('/teams/:teamId/members', MemberController.store);
routes.delete('/teams/:teamId/members/:memberId', MemberController.remove);

routes.get('/themes', ThemeController.index);
routes.post('/themes', ThemeController.store);
routes.delete('/themes/:themeId', ThemeController.remove);

routes.get('/themes/:themeId/subthemes', SubthemeController.index);
routes.post('/themes/:themeId/subthemes', SubthemeController.store);
routes.delete('/themes/:themeId/subthemes/:subthemeId', SubthemeController.remove);

routes.get('/', (req, res) => {
  return res.json({hello:'world'});
})

module.exports = routes;