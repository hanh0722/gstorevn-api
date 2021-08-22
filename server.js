import express from "express";
import cors from "cors";

import loginRoute from './routes/login.mjs';
import registerRoute from './routes/register.mjs';
import getPostsRoute from './routes/getPost.mjs';
import postId from './routes/postId.mjs';
import admin from './routes/admin.mjs';
import sortBlog from './routes/sortBlog.mjs';
import updateAndCreatePost from './routes/images.mjs';
import getBlogsController from "./controller/getBlogs.mjs";
import userRoute from './routes/user.mjs';
import searchBlogRoute from './routes/searchBlog.mjs';
// to use, we have to change to mjs => module js

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(loginRoute);
app.use(registerRoute);
app.use(getPostsRoute);
app.use(postId);
app.use(admin);
app.use(sortBlog);

app.get("/post/news/:number", getBlogsController);

app.use(updateAndCreatePost);

app.use('/api', userRoute);

// temporary for searching existing title
app.use(searchBlogRoute);


app.listen(3001);
