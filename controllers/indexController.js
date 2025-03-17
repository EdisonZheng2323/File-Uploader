const db = require('../db/queries');
const passport = require('passport');
const bcrypt = require('bcryptjs');

async function getHome(req, res){
  const messages = await db.getAllMessages();
  const users = await db.getAllUsers();
  res.render("index", {messages: messages, users: users});
}

async function getSignUp(req, res) {
  res.render("sign-up");
}

async function postSignUp(req, res){
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(req.body.first_name, req.body.last_name, req.body.username, hashedPassword, false);
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

async function getMembership(req, res){
  res.render("membership");
}

async function postMembership(req, res){
  const secret = req.body.secret_password;
  const user =  req.user;
  if(secret === process.env.SECRET_PASSWORD){
    db.updateMembership(true, user.id);
    res.redirect("/");
  }
  else{
    res.redirect("/membership");
  }
}

async function getMessage(req, res){
  res.render('message');
}

async function postMessage(req, res){
  const user = req.user;
  const text = req.body.text;
  const title = req.body.title;
  const id = user.id;
  db.insertMessage(id, title, text);
  res.redirect('/');
}

module.exports = {getHome, getSignUp, postSignUp, getLogin, getMembership, postMembership, getMessage, postMessage};