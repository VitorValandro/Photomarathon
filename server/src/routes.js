const express = require('express');
const multer = require('multer');

const TeamController = require('./controllers/TeamController');
const MemberController = require('./controllers/MemberController');
const ThemeController = require('./controllers/ThemeController');
const SubthemeController = require('./controllers/SubthemeController');
const PhotoController = require('./controllers/PhotoController');

const uploadConfig = require('./config/uploadConfig');
const AuthController = require('./controllers/AuthController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/teams', authMiddleware, TeamController.index); // apenas time logado
routes.post('/teams', TeamController.store); // liberado
routes.delete('/teams/:teamId', TeamController.remove); // apenas admin

routes.post('/teams/login', AuthController.login); // liberado

routes.get('/teams/:teamId/members', authMiddleware, MemberController.index); // apenas time logado
routes.post('/teams/:teamId/members', authMiddleware, MemberController.store); // apenas time logado
routes.delete('/teams/:teamId/members/:memberId', authMiddleware, MemberController.remove); // apenas time logado

routes.post('/teams/:teamId/photos', upload.single('file'), /*authMiddleware,*/ PhotoController.store); // apenas time logado
routes.delete('/teams/:teamId/photos/:photoId', PhotoController.remove); // apenas admin

routes.get('/themes', ThemeController.index); // liberado
routes.post('/themes', ThemeController.store); // apenas admin
routes.delete('/themes/:themeId', ThemeController.remove); // apenas admin

routes.get('/themes/:themeId/subthemes', SubthemeController.index); // liberado
routes.post('/themes/:themeId/subthemes', SubthemeController.store); // apenas admin
routes.delete('/themes/:themeId/subthemes/:subthemeId', SubthemeController.remove); // apenas admin

routes.get('/photos', PhotoController.indexAll); // liberado
routes.get('/photos/teams/:teamId', PhotoController.indexByTeam); // liberado
routes.get('/photos/subthemes/:subthemeId', PhotoController.indexBySubtheme); // liberado

routes.get('/', authMiddleware, (req, res) => {
  console.log(req.teamId);
  return res.json({hello:'world'});
})

module.exports = routes;