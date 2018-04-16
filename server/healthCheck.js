var photoPosts = [];
const fs = require('fs');
const postsPath = './server/data/posts.json';
funcModule = (function () {
    return {
        getPhotoPosts: function (skip = 0, top = 9, filterConfig) {
            let result = {};
            result.pagination = true;
            if (typeof skip !== 'number' || typeof top !== 'number') {
                console.log("typeError in getPhotoPosts");
                return;
            }
            photoPosts = JSON.parse(fs.readFileSync(postsPath), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (filterConfig === undefined) {
                if (photoPosts.slice(skip + top).length === 0) {
                    result.pagination = false;
                }
                result.posts = photoPosts.slice(skip, skip + top);
                return result;
            } else {
                if (typeof filterConfig !== 'object') {
                    console.log('typeError in getPhotoPosts');
                    return;
                }
                let photoFilterResult = photoPosts;
                if (filterConfig.authors) {
                    photoFilterResult = photoFilterResult.filter(elem => filterConfig.authors.includes(elem.author));
                }
                if (filterConfig.createdAt) {
                    photoFilterResult = photoFilterResult.filter(elem =>
                        elem.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                        elem.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                        elem.createdAt.getDate() === filterConfig.createdAt.getDate());
                }
                if (filterConfig.hashtags) {
                    photoFilterResult = photoFilterResult.filter(elem => {
                        return filterConfig.hashtags.every((tag) => {
                            return elem.hashtags.includes(tag);
                        });
                    });
                }
                if (photoFilterResult.slice(skip, skip + top).length <= 9 && photoFilterResult.slice(skip + top).length === 0) {
                    result.pagination = false;
                }
                result.posts = photoFilterResult.slice(skip, skip + top);
                return result;
            }
        },
        getPhotoPost: function (id) {
            photoPosts = JSON.parse(fs.readFileSync(postsPath), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            return photoPosts.find(elem => elem.id == id);
        },
        validatePhotoPost: function (photoPost) {
            if (typeof photoPost.description !== 'string' || photoPost.description.length > 200 || photoPost.description.length === 0) return false;
            if (typeof photoPost.author !== 'string' || photoPost.author.length === 0) return false;
            if (typeof photoPost.id !== 'string' || photoPost.id.length === 0) return false;
            if (!(photoPost.hashtags instanceof Array)) return false;
            if (!(photoPost.likes instanceof Array)) return false;
            if (!(new Date(photoPost.createdAt) instanceof Date)) return false;
            if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink.length === 0) return false;
            return true;
        },
        addPhotoPost: function (photoPost) {
            if (this.validatePhotoPost(photoPost) && photoPosts.findIndex(elem => elem.id === photoPost.id) === -1) {
                photoPosts = JSON.parse(fs.readFileSync(postsPath), function (key, value) {
                    if (key == 'createdAt') return new Date(value);
                    return value;
                });
                photoPosts.push(photoPost);
                photoPosts.sort((elem1, elem2) => new Date(elem2.createdAt) - new Date(elem1.createdAt));
                fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
                fs.writeFileSync(`./server/data/timePageID.json`, `{"id":"${(parseInt(photoPost.id) + 1)}"}`);
                return true;
            }
            else {
                console.log("Is not valid photoPost");
                return false;
            }
        },
        validateEditedPost: function (post) {
            if (typeof post.description !== 'undefined') {
                if (post.description.length === 0 || post.description.length > 200 || typeof post.description !== 'string') return false;
            }
            if (typeof post.photoLink !== 'undefined') {
                if (typeof post.photoLink !== 'string' || post.photoLink.length === 0) return false;
            }
            if (post.author)
                if (typeof post.author !== 'string' || post.author.length === 0) return false;
            if (post.hashtags)
                if (!(post.hashtags instanceof Array)) return false;
            if (post.likes)
                if (!(post.likes instanceof Array)) return false;
            if (post.createdAt)
                if (!(post.createdAt instanceof Date)) return false;
            if (post.id)
                if (typeof post.id !== 'string' || post.id.length === 0) return false;
            return true;
        },
        editPhotoPost: function (id, photoPost) {
            if (funcModule.validateEditedPost(photoPost)) {
                photoPosts = JSON.parse(fs.readFileSync(postsPath), function (key, value) {
                    if (key == 'createdAt') return new Date(value);
                    return value;
                });
                let index = photoPosts.findIndex(elem => elem.id == id);
                if (index !== -1) {
                    if (photoPost.description) { photoPosts[index].description = photoPost.description; }
                    if (photoPost.hashtags) { photoPosts[index].hashtags = photoPost.hashtags; }
                    if (photoPost.photoLink) { photoPosts[index].photoLink = photoPost.photoLink; }
                    if (photoPost.likes) { photoPosts[index].likes = photoPost.likes; }
                    fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
                    return true;
                }
            }
            return false;
        },
        removePhotoPost: function (id) {
            photoPosts = JSON.parse(fs.readFileSync(postsPath), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            let index = photoPosts.findIndex(elem => elem.id == id);
            if (index !== -1) {
                photoPosts.splice(index, 1);
                fs.writeFileSync(postsPath, JSON.stringify(photoPosts));
                return true;
            } else return false;
        }
    }
})();

module.exports = funcModule;