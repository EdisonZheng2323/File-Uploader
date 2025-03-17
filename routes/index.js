const {Router} = require("express");
const router = Router();
const passport = require('passport');
const {postSignUp, getHome, getSignUp, getLogin, getMembership, postMembership, getMessage, postMessage} = require('../controllers/indexController');

router.get('/', getHome);

router.get('/sign-up', getSignUp);
router.post('/sign-up', postSignUp);

router.get('/login', getLogin);
router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  }));

  router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  router.get('/membership', getMembership);

  router.post('/membership', postMembership);

  router.get('/message', getMessage);

  router.post('/message', postMessage);
module.exports = router;