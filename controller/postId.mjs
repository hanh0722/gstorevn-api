import db from '../db/db.mjs';
const postIdController = (req, res) => {
  const params = req.params;
  db.select("*")
    .from("blogs")
    .where("id", "=", params.id)
    .then((data) => {
      if (!data) {
        return res.status(400).json("not found!");
      }
      return res.json(data[0]);
    })
    .catch((err) => res.status(400).json("err"));
};

export default postIdController;