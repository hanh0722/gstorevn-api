import db from '../db/db.mjs';

const getPostsController = (req, res) =>{
    db.select("*")
    .from("blogs")
    .orderBy("dateblog", "desc")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
};

export default getPostsController;