const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');

const router = express.Router();
/*
function addUser(username, password) {
    if (!username || !password) return Promise.reject();
    return User.findOne({ username })
        .then((res) => { if (!res) throw res; })
        .catch(() => {
            const salt = bcrypt.genSaltSync(10);
            const user = new User({
                username,
                passwordHash: bcrypt.hashSync(password, salt),
                passwordSalt: salt,
            });
            user.save().then(() => done(null, user))
                .catch(err => console.log(err));
        });
}
*/
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const newuser = new User({
                username,
                passwordHash: bcrypt.hashSync(password, salt),
                passwordSalt: salt,
            });
            return newuser.save().then(() => done(null, newuser))
                .catch(() => done(null, false));
        }
        if (user.passwordHash !== bcrypt.hashSync(password, user.passwordSalt)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

router.post('/', passport.authenticate('local', {
    failureFlash: true,
    successFlash: true,
}), (req, res) => {
    res.cookie('session_id', req.sessionID);
    res.send({ info: 1, status: 'logged' });
});

module.exports = router;
