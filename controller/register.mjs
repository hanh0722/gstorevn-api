import db from '../db/db.mjs';
import bcrypt from 'bcrypt';

const registerController = (req, res) =>{
    const {email, password, name} = req.body;
    const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) =>{
      if(err){
          return res.status(400).json('error');
      }
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
      }).catch((err) => res.status(400).json(err));
  });
}

export default registerController;