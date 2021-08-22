import express from 'express';
import findBlog from '../controller/findPost.mjs';
const Router = express.Router();

Router.get('/api/:name', findBlog);

export default Router;