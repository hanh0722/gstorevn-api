import express from 'express';

import {getUsers, informationUser, updateUser, deleteUser} from '../controller/users.mjs';

const Router = express.Router();

Router.get('/users', getUsers);

Router.get('/get-user/:email', informationUser);

Router.put('/update-user', updateUser);

Router.delete('/remove-user', deleteUser);

export default Router;