const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const mongoose = require('mongoose');
const authRouter = require('./server/controller/authorization');
const routers = require('./server/routers/postRouter');

const app = express();

const dbName = 'PhotoCloudDB';
const connectionString = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(connectionString);

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'AXCJRGSBJUHFOS-AVDAV-4FDfd',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: `${connectionString}-app`,
        ttl: 20 * 24 * 60 * 60,
    }),
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use('/login', authRouter);
app.put('/logout', (req, res) => {
    req.session.destroy();
    res.send({ status: 'ok' });
});
app.get('/setuser', (req, res) => {
    if (req.session) res.send({ status: 'ok', username: req.user.username });
    res.status(401).end();
});

app.use('/', routers);

const server = app.listen(3000, () => console.log(`Server is listening on port ${server.address().port}`));
