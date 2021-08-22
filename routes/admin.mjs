import express from 'express';
import adminController from '../controller/admin.mjs';
const Router = express.Router();

Router.get('/admin/:id', adminController);

export default Router;