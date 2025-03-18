const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const verifyCallback = async (username, password, done) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: username
      }
    })
    const user = users[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" })
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: id
      }
    })
    const user = users[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

