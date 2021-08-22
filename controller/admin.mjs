import db from '../db/db.mjs';
const adminController = (req, res) =>{
    const params = req.params;
    db.select("*")
    .from("users")
    .where("id", "=", params.id)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => res.status(400).json("err"));
}

export default adminController