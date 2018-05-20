const validateModule = {
    validatePhotoPost(photoPost) {
        if (typeof photoPost.description !== 'string' || photoPost.description.length > 200 || photoPost.description.length === 0) return false;
        if (!(photoPost.hashtags instanceof Array)) return false;
        if (!(photoPost.likes instanceof Array)) return false;
        if (!(new Date(photoPost.createdAt) instanceof Date)) return false;
        if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink.length === 0) return false;
        return true;
    },
    validateEditedPost(post) {
        if (typeof post.description !== 'undefined') {
            if (post.description.length === 0 || post.description.length > 200 || typeof post.description !== 'string') return false;
        }
        if (typeof post.photoLink !== 'undefined') {
            if (typeof post.photoLink !== 'string' || post.photoLink.length === 0) return false;
        }
        if (post.author) {
            if (typeof post.author !== 'string' || post.author.length === 0) return false;
        }
        if (post.hashtags) { if (!(post.hashtags instanceof Array)) return false; }
        if (post.likes) { if (!(post.likes instanceof Array)) return false; }
        if (post.createdAt) { if (!(post.createdAt instanceof Date)) return false; }
        if (post.id) { if (typeof post.id !== 'string' || post.id.length === 0) return false; }
        return true;
    },
};

module.exports = validateModule;
