const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function getHome(req, res){
  const users = await db.getAllUsers();
  res.render("index", {users: users});
}

async function getSignUp(req, res) {
  res.render("sign-up");
}

async function postSignUp(req, res){
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(req.body.username, hashedPassword);
    res.redirect("/");
  } 
  catch (error) {
    console.error(error);
    next(error);
  }
}

async function getLogin(req, res){
  res.render("login");
}




module.exports = {getHome, getSignUp, postSignUp, getLogin, };