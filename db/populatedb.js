const { initialize } = require('passport');
const {Client} = require('pg');
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT,
  last_name TEXT,
  username TEXT, 
  password TEXT,
  membership_status BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function initializeDatabase(){
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST_NAME}:${process.env.PORT}/${process.env.DATABASE}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

module.exports = initializeDatabase;