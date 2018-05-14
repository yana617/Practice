const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');

const router = express.Router();

function addUser(username, password) {
    if (!username || !password) return false;
    User.findOne({ username })
        .then((res) => { if (!res) throw res; })
        .catch(() => {
            const salt = bcrypt.genSaltSync(10);
            const user = new User({
                username,
                passwordHash: bcrypt.hashSync(password, salt),
                passwordSalt: salt,
            });
            user.save()
                .catch(err => console.log(err));
        });
    return true;
}

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            addUser(username, password);
            return done(null, { message: 'You are registered.' });
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
    if (!req.user.message) res.send(JSON.stringify({ info: 1, status: 'logged' }));
    else res.send(JSON.stringify({ info: 2, status: req.user.message }));
});

module.exports = router;
