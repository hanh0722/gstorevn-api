import express from 'express';
import upload from '../models/fileEngine.mjs';
import {changeImages, uploadImages, createPost, updatePost} from '../controller/image.mjs';
const Router = express.Router();

Router.post("/api/images/:id", upload.array("photos", 3) ,changeImages);

Router.post('/api/upload-images',upload.array("photos", 3), uploadImages);

Router.post('/api/create-post', createPost);

Router.put('/api/upload', updatePost);

export default Router;