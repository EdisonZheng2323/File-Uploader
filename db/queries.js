const pool = require('./pool');

async function insertUser(first_name, last_name, username, password, membership_status){
  await pool.query("INSERT INTO users (first_name, last_name, username, password, membership_status) values ($1, $2, $3, $4, $5)", [first_name, last_name, username, password, membership_status]);
}

async function updateMembership(membership_status, id){
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [membership_status, id])
}

async function insertMessage(id, title, text){
  await pool.query("INSERT INTO messages (user_id, title, text) values ($1, $2, $3)", [id, title, text]);
}

async function getAllMessages(){
  const {rows} = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getAllUsers(){
  const {rows} = await pool.query("SELECT * FROM users");
  return rows;
}

module.exports = {insertUser, updateMembership, insertMessage, getAllMessages, getAllUsers};
