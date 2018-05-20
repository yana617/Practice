const express = require('express');
const func = require('../functions');
const Post = require('../model/Post');
const fs = require('fs');
const multer = require('multer');

const upload = multer();
const router = express.Router();

router.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFileSync(`./public/img/${req.query.user}_${req.file.originalname}`, req.file.buffer);
    res.status(204).end();
});
router.post('/addPhotoPost', (req, res) => {
    const newpost = req.body;
    if (func.validatePhotoPost(newpost) && req.session) {
        const post = new Post({
            author: req.user.username,
            createdAt: new Date(),
            description: newpost.description,
            photoLink: newpost.photoLink,
            hashtags: newpost.hashtags,
            likes: [],
        });
        Post.collection.insertOne(post, (err) => {
            if (err) {
                res.send('Error DB');
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
            if (err) res.send({ status: 'Error' });
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
        const filterConfig = JSON.parse(JSON.stringify(req.body), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        Post.find((err, posts) => {
            if (err) {
                res.send('DB-error');
            } else {
                posts.reverse();
                const result = {};
                let photoFilterResult = posts;
                result.pagination = true;
                if (typeof skip !== 'number' || typeof top !== 'number') {
                    console.log('typeError in getPhotoPosts');
                    res.send();
                }
                if (!filterConfig) {
                    if (posts.slice(skip + top).length === 0) {
                        result.pagination = false;
                    }
                    result.posts = posts.slice(skip, skip + top);
                } else {
                    if (filterConfig.authors) {
                        photoFilterResult = photoFilterResult
                            .filter(elem => filterConfig.authors.includes(elem.author));
                    }
                    if (filterConfig.createdAt) {
                        photoFilterResult = photoFilterResult.filter(elem =>
                            elem.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                            elem.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                            elem.createdAt.getDate() === filterConfig.createdAt.getDate());
                    }
                    if (filterConfig.hashtags) {
                        photoFilterResult = photoFilterResult.filter(elem => filterConfig.hashtags
                            .every(tag => elem.hashtags.includes(tag)));
                    }
                    if (photoFilterResult.slice(skip, skip + top).length <= 9
                        && photoFilterResult.slice(skip + top).length === 0) {
                        result.pagination = false;
                    }
                    result.posts = photoFilterResult.slice(skip, skip + top);
                }
                res.send(result);
            }
            return 0;
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
                    res.send({ status: 'not-edited' });
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
                res.send({ status: 'not-removed' });
            }
            res.send({ status: 'removed' });
        });
    } else {
        res.status(400).send();
    }
});

module.exports = router;
