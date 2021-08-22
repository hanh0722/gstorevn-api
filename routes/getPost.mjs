import express from 'express';
import getPostsController from '../controller/getPosts.mjs';

const Router = express.Router();

Router.get('/get-all-posts', getPostsController);

export default Router;