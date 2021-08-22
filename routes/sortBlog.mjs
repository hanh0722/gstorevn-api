import express from 'express';
import sortBlogController from '../controller/sortBlog.mjs';

const Router = express.Router();

Router.get("/post/:condition", sortBlogController);

export default Router;