const multer = require('multer');
const upload = multer();
const express = require('express');
const app = express();
const fs = require('fs');
const func = require('./server/healthCheck');
const postsPath = './server/data/posts.json';

app.use(express.static('./public'));
app.use(require('body-parser').json());

app.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFileSync('./public/img/' + req.file.originalname, req.file.buffer);
    res.status(200).end();
});

app.post('/addPhotoPost', (req, res) => {
    const post = req.body;
    post.id = JSON.parse(fs.readFileSync('./server/data/timePageID.json')).id;
    if (func.addPhotoPost(post)) {
        res.status(204).end();
    } else {
        res.status(400).end();
    }
});
app.get('/getPhotoPost', (req, res) => {
    if (req.query.id) {
        let post = func.getPhotoPost(req.query.id);
        if (post) {
            res.send(post);
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
});
app.post('/getPhotoPosts', (req, res) => {
    if (req.query.skip && req.query.top) {
        const skip = parseInt(req.query.skip);
        const top = parseInt(req.query.top);
        let filterConfig = req.body;
        if (JSON.stringify(filterConfig) === '{}') { filterConfig = undefined; }
        let result = func.getPhotoPosts(skip, top, filterConfig);
        res.send(result).status(200).end();
    } else {
        res.send("error").status(404).end();
    }
});
app.put('/editPhotoPost', (req, res) => {
    if (req.query.id && req.body) {
        if (func.editPhotoPost(req.query.id, req.body)) {
            res.status(204).end();
        } else {
            res.status(400).end();
        }
    } else {
        res.status(400).end();
    }
});
app.delete('/removePhotoPost', (req, res) => {
    if (req.query.id) {
        if (func.removePhotoPost(req.query.id)) {
            res.status(204).end();
        } else {
            res.status(400).end();
        }
    } else {
        res.status(400).send();
    }
});

const server = app.listen(3000, () => console.log(`Server is listening on port ${server.address().port}`));