import db from '../db/db.mjs';

const LoginModel = (email) =>{
    const data = db.select("*")
    .from("login")
    .where("username", "=", email)
    .returning("*")
    
    return data;
    // returning return a promise
}

export default LoginModel;