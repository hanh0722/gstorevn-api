import db from '../db/db.mjs';
import bcrypt from 'bcrypt';

const registerModel = async (password, name, email) =>{
    const saltRounds = 10;
  const hash = bcrypt.hash(password, saltRounds, (err, data) =>{
    return data;
  });
  db.transaction((trx) => {
    trx
      .insert({
        username: email,
        password: hash,
        islocked: false,
      })
      .into("login")
      .returning("username")
      .then((EmailLogIn) => {
        return trx("users")
          .insert({
            name: name,
            username: EmailLogIn[0],
            islocked: false,
          })
          .returning("*")
          .then((user) => res.json(user[0]))
          .catch((err) => res.status(400).json("cannot create user"));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("cannot transaction"));
}

export default registerModel;