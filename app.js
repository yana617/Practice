const multer = require('multer');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const func = require('./server/functions');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const mongoose = require('mongoose');
const authRouter = require('./server/controller/authorization');

const upload = multer();
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

app.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFileSync(`./public/img/${req.query.user}_${req.file.originalname}`, req.file.buffer);
    res.status(204).end();
});

app.post('/addPhotoPost', (req, res) => {
    const post = req.body;
    post.id = JSON.parse(fs.readFileSync('./server/data/timePageID.json')).id;
    if (func.addPhotoPost(post)) {
        res.send(JSON.stringify({ status: 'added' }));
    } else {
        res.send(JSON.stringify({ status: 'no-added' }));
    }
});
app.get('/getPhotoPost', (req, res) => {
    if (req.query.id) {
        const post = func.getPhotoPost(req.query.id);
        if (post) {
            res.send(post);
        } else {
            res.send(JSON.stringify({ status: 'Error' }));
        }
    } else {
        res.status(400).end();
    }
});
app.post('/getPhotoPosts', (req, res) => {
    if (req.query.skip && req.query.top) {
        const skip = parseInt(req.query.skip, 10);
        const top = parseInt(req.query.top, 10);
        let filterConfig = req.body;
        if (JSON.stringify(filterConfig) === '{}') {
            filterConfig = undefined;
        } else {
            filterConfig = JSON.parse(JSON.stringify(filterConfig), (key, value) => {
                if (key === 'createdAt') return new Date(value);
                return value;
            });
        }
        const result = func.getPhotoPosts(skip, top, filterConfig);
        res.send(result).status(200).end();
    } else {
        res.status(400).end();
    }
});
app.put('/editPhotoPost', (req, res) => {
    if (req.query.id && req.body) {
        if (func.editPhotoPost(req.query.id, req.body)) {
            res.send(JSON.stringify({ status: 'edited' })).status(204).end();
        } else {
            res.send(JSON.stringify({ status: 'not-edited' })).status(200).end();
        }
    } else {
        res.status(400).end();
    }
});
app.delete('/removePhotoPost', (req, res) => {
    if (req.query.id) {
        if (func.removePhotoPost(req.query.id)) {
            res.send(JSON.stringify({ status: 'removed' })).status(200).end();
        } else {
            res.send(JSON.stringify({ status: 'not-removed' })).status(200).end();
        }
    } else {
        res.status(400).send();
    }
});

const server = app.listen(3000, () => console.log(`Server is listening on port ${server.address().port}`));
