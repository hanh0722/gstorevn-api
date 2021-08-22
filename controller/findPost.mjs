import db from "../db/db.mjs";

const findBlog = (req, res) => {
  const { name } = req.params;
  db.select("*")
    .from("blogs")
    .whereRaw("LOWER(title) LIKE '%' || LOWER(?) || '%' ", name)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("error"));
};

export default findBlog;