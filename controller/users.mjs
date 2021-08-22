import db from '../db/db.mjs';
import bcrypt from 'bcrypt';
export const getUsers = (req, res) => {
  db.select("*")
    .from("users")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("error get users"));
};

export const informationUser = (req, res) => {
  const { email } = req.params;
  db.select("*")
    .from("users")
    .where("username", "=", email)
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json("not found user");
      }
      return res.json(data[0]);
    });
};

export const updateUser = (req, res) => {
  const { username, newPassword, name, islocked } = req.body;
  if (!username || !newPassword || !name || islocked === null) {
    return res.status(400).json("not valid!");
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(newPassword, saltRounds);
  db.transaction((trx) => {
    trx("login")
      .where("username", "=", username)
      .update({
        password: hash,
        islocked: islocked,
      })
      .returning("*")
      .then((dataBackUp) => {
        return trx("users")
          .where("username", "=", dataBackUp[0].username)
          .update({
            username: dataBackUp[0].username,
            name: name,
            islocked: islocked,
          })
          .returning("*")
          .then((response) => res.json(response[0]))
          .catch((err) => res.status(400).json("error in transaction"));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("cannot transaction"));
};

export const deleteUser = async (req, res) => {
  const { username } = req.body;
  try {
    const rq1 = await db("login").where("username", "=", username).del();
    const rq2 = await db("users").where("username", "=", username).del();
    if (rq1 === 1 && rq2 === 1) {
      return res.json("success");
    } else {
      throw new Error("error");
    }
  } catch (err) {
    res.status(400).json("error");
  }
};
