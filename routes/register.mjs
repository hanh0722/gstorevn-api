import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db/db.mjs';
import registerController from '../controller/register.mjs';
const Router = express.Router();

Router.post('/register', registerController);

export default Router;