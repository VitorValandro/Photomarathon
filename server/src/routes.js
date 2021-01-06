const express = require('express');
const multer = require('multer');

const TeamController = require('./controllers/TeamController');
const MemberController = require('./controllers/MemberController');
const ThemeController = require('./controllers/ThemeController');
const SubthemeController = require('./controllers/SubthemeController');
const PhotoController = require('./controllers/PhotoController');

const uploadConfig = require('./config/uploadConfig');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/teams', TeamController.index);
routes.post('/teams', TeamController.store);
routes.delete('/teams/:teamId', TeamController.remove);

routes.get('/teams/:teamId/members', MemberController.index);
routes.post('/teams/:teamId/members', MemberController.store);
routes.delete('/teams/:teamId/members/:memberId', MemberController.remove);

routes.post('/teams/:teamId/photos', upload.single('file'), PhotoController.store);
routes.delete('/teams/:teamId/photos/:photoId', PhotoController.remove);

routes.get('/themes', ThemeController.index);
routes.post('/themes', ThemeController.store);
routes.delete('/themes/:themeId', ThemeController.remove);

routes.get('/themes/:themeId/subthemes', SubthemeController.index);
routes.post('/themes/:themeId/subthemes', SubthemeController.store);
routes.delete('/themes/:themeId/subthemes/:subthemeId', SubthemeController.remove);

routes.get('/photos', PhotoController.indexAll);
routes.get('/photos/:teamId', PhotoController.indexByTeam);
routes.get('/photos/:subthemeId', PhotoController.indexBySubtheme);

routes.get('/', (req, res) => {
  return res.json({hello:'world'});
})

module.exports = routes;