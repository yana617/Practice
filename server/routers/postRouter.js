const express = require('express');
const func = require('../functions');
const Post = require('../model/Post');
const fs = require('fs');
const multer = require('multer');

const upload = multer();
const router = express.Router();

router.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFileSync(`./public/img/${req.user.username}_${req.file.originalname}`, req.file.buffer);
    res.status(204).end();
});
router.post('/addPhotoPost', (req, res) => {
    const newpost = req.body;
    if (func.validatePhotoPost(newpost) && req.session) {
        const post = new Post({
            author: req.user.username,
            createdAt: new Date(),
            shortCreatedAt: JSON.stringify(new Date()).substr(1, 10),
            description: newpost.description,
            photoLink: newpost.photoLink,
            hashtags: newpost.hashtags,
            likes: [],
        });
        Post.collection.insertOne(post, (err) => {
            if (err) {
                res.status(500).end();
            } else {
                res.send({ status: 'added' });
            }
        });
    } else {
        res.send({ status: 'no-added' });
    }
});
router.get('/getPhotoPost', (req, res) => {
    if (req.query.id && req.session) {
        Post.findById(req.query.id, (err, post) => {
            if (err) res.status(500).end();
            res.send(post);
        });
    } else {
        res.status(400).end();
    }
});
router.post('/getPhotoPosts', (req, res) => {
    if (req.query.skip && req.query.top) {
        const skip = parseInt(req.query.skip, 10);
        const top = parseInt(req.query.top, 10);
        const filterConfig = req.body;
        if (filterConfig.author) {
            filterConfig.author = { $in: req.body.author };
        }
        if (filterConfig.hashtags) {
            filterConfig.hashtags = { $all: req.body.hashtags };
        }
        Post.find(filterConfig).sort({ createdAt: -1 }).skip(skip).limit(top)
            .exec((err, posts) => {
                if (err) res.status(500).end();
                const result = {};
                result.pagination = true;
                result.posts = posts;
                return Post.find(filterConfig).count((error, count) => {
                    if (error) res.status(500).end();
                    if (count <= skip + top) {
                        result.pagination = false;
                    }
                    res.send(result);
                });
            });
    } else {
        res.status(400).end();
    }
});
router.put('/editPhotoPost', (req, res) => {
    if (req.query.id && req.body && req.session) {
        if (func.validateEditedPost(req.body)) {
            const changes = {};
            if (req.body.description) { changes.description = req.body.description; }
            if (req.body.hashtags) { changes.hashtags = req.body.hashtags; }
            if (req.body.photoLink) { changes.photoLink = req.body.photoLink; }
            if (req.body.likes) { changes.likes = req.body.likes; }
            const details = { _id: req.query.id };
            Post.update(details, changes, (err) => {
                if (err) {
                    res.status(500).end();
                } else {
                    res.send({ status: 'edited' });
                }
            });
        } else {
            res.send({ status: 'not-edited' });
        }
    } else {
        res.status(400).end();
    }
});
router.delete('/removePhotoPost', (req, res) => {
    if (req.query.id && req.session) {
        const details = { _id: req.query.id };
        Post.remove(details, (err) => {
            if (err) {
                res.status(500).end();
            }
            res.send({ status: 'removed' });
        });
    } else {
        res.status(400).send();
    }
});

module.exports = router;
