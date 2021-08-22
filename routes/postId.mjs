import express from "express";
import postIdController from "../controller/postId.mjs";

const Router = express.Router();

Router.get("/get-post/:id", postIdController);


export default Router;