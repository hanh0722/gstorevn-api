import db from "../db/db.mjs";
import bcrypt from "bcrypt";
import LoginModel from "../models/login.mjs";
const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !email.includes("@")) {
    return res.status(400).json("not valid");
  }
  try {
    const data = await LoginModel(email);
    const passwordIsValid = bcrypt.compareSync(password, data[0].password);
    if (!passwordIsValid) {
      throw new Error("error!");
    }
    res.json(data[0]);
  } catch (err) {
    res.status(400).json("not valid!");
  }
};

export default Login;
