import db from '../db/db.mjs';
const sortBlogController = (req, res) => {
  const params = req.params;
  db("blogs")
    .orderBy("dateblog", params.condition)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error sorting post"));
};

export default sortBlogController;