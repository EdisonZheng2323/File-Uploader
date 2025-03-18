const express = require('express');
const app = express();
const path = require('path');
const router = require("./routes/index");
const {PrismaClient} = require('@prisma/client');
const passport = require('passport');
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
require('dotenv').config();
require('./db/passport');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use(session({
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionIdL: true,
    }
  ),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
}));

app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(router);

app.listen(3000);
