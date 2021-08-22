import db from "../db/db.mjs";

const getBlogsController = (req, res) => {
  const { number } = req.params;
  db("blogs")
    .orderBy("id", "desc")
    .limit(number)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("err"));
};

export default getBlogsController;