var photoPosts = [
    {
        id: '1',
        descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-01T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#победа']
    },
    {
        id: '2',
        descriprion: 'Как красиво!',
        createdAt: new Date('2018-02-28T21:00:00'),
        author: 'YanPark',
        photoLink: 'IMGP2620',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#природа']
    },
    {
        id: '3',
        descriprion: 'Save homeless dog! You can do it!',
        createdAt: new Date('2018-02-27T21:00:00'),
        author: 'Ki North',
        photoLink: 'IMGP2622',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '4',
        descriprion: 'Милый кот хочет кушать!',
        createdAt: new Date('2018-02-26T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'INGP2621',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    },
    {
        id: '5',
        descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-25T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#победа']
    },
    {
        id: '6',
        descriprion: 'Как красиво!',
        createdAt: new Date('2018-02-24T21:00:00'),
        author: 'YanPark',
        photoLink: 'IMGP2620',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#природа', '#красота', '#мир']
    },
    {
        id: '7',
        descriprion: 'Save homeless dog! You can do it!',
        createdAt: new Date('2018-02-23T21:00:00'),
        author: 'Ki North',
        photoLink: 'IMGP2622',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '8',
        descriprion: 'Милый кот хочет кушать!',
        createdAt: new Date('2018-02-22T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'INGP2621',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    },
    {
        id: '9',
        descriprion: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-21T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#победа']
    },
    {
        id: '10',
        descriprion: 'Как красиво!',
        createdAt: new Date('2018-02-20T21:00:00'),
        author: 'YanPark',
        photoLink: 'IMGP2620',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#природа', '#красота']
    },
    {
        id: '11',
        descriprion: 'Save homeless dog! You can do it!',
        createdAt: new Date('2018-02-19T21:00:00'),
        author: 'Ki North',
        photoLink: 'IMGP2622',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '12',
        descriprion: 'Милый кот хочет кушать!',
        createdAt: new Date('2018-02-18T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'INGP2621',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    }
];
let photoPost1 = {
    id: '20',
    descriprion: 'Как красиво!',
    createdAt: new Date('2018-03-02T21:00:00'),
    author: 'YanPark',
    photoLink: 'IMGP2620',
    likes: ['MarkL', 'Bobby'],
    hashtags: ['#природа']
}
let photoPost2 = {
    id: '2',
    descriprion: 'Как красиво!',
    createdAt: new Date('2018-03-02T21:00:00'),
    author: 'YanPark',
    photoLink: 'IMGP2620',
    likes: ['MarkL', 'Bobby'],
    hashtags: ['#природа']
}
let photoPost3 = {
    id: '13',
    descriprion: 'Как красиво!',
    createdAt: new Date('2018-03-03T21:00:00'),
    author: 'YanPark',
    photoLink: 'IMGP2620',
    hashtags: ['#природа']
}

let editPhoto1 = {
    descriprion: 'hey it is wrong do not do like this, hey it is wrong do not do like this,hey it is wrong do not do like this,hey it is wrong do not do like this,hey it is wrong do not do like this,hey it is wrong do not do like this'
}

let result = (function () {
    return {
        getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            if (typeof skip !== 'number' || typeof top !== 'number') {
                console.log("typeError in getPhotoPosts");
                return;
            }
            if (filterConfig === undefined) {
                return photoPosts.slice(skip, skip + top);
            } else {
                if (typeof filterConfig !== 'object') {
                    console.log('typeError in getPhotoPosts');
                    return;
                }
                let photoFilterResult = photoPosts;
                if (filterConfig.author) {
                    photoFilterResult = photoFilterResult.filter(elem => elem.author === filterConfig.author);
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
                return photoFilterResult.slice(skip, skip + top);
            }
            return photoPosts;
        },
        getPhotoPost: function (id) {
            return photoPosts.find(elem => elem.id == id);
        },
        validatePhotoPost: function (photoPost) {
            if (typeof photoPost.descriprion !== 'string' || photoPost.descriprion.length > 200 || photoPost.descriprion.length === 0) return false;
            if (typeof photoPost.author !== 'string' || photoPost.author.length === 0) return false;
            if (typeof photoPost.id !== 'string' || photoPost.id.length === 0) return false;
            if (!(photoPost.hashtags instanceof Array)) return false;
            if (!(photoPost.likes instanceof Array)) return false;
            if (!(photoPost.createdAt instanceof Date)) return false;
            if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink.length === 0) return false;
            return true;
        },
        addPhotoPost: function (photoPost) {
            if (this.validatePhotoPost(photoPost) && photoPosts.findIndex(elem => elem.id === photoPost.id) === -1) {
                photoPosts.push(photoPost);
                photoPosts.sort((elem1, elem2) => elem2.createdAt - elem1.createdAt);
                return true;

            }
            else {
                console.log("Is not valid photoPost");
                return false;
            }
        },
        validatePost: function (post) {
            if (post.descriprion)
                if (post.descriprion.length === 0 || post.descriprion.length > 200 || typeof post.descriprion !== 'string') return false;
            if (post.author)
                if (typeof post.author !== 'string' || post.author.length === 0) return false;
            if (post.hashtags)
                if (!(post.hashtags instanceof Array)) return false;
            if (post.photoLink)
                if (typeof post.photoLink !== 'string' || post.photoLink.length === 0) return false;
            if (post.likes)
                if (!(post.likes instanceof Array)) return false;
            if (post.createdAt)
                if (!(post.createdAt instanceof Date)) return false;
            if (post.id)
                if (typeof post.id !== 'string' || post.id.length === 0) return false;
            return true;
        },
        editPhotoPost: function (id, photoPost) {
            if (this.validatePost(photoPost)) {
                let index = photoPosts.findIndex(elem => elem.id == id);
                if (photoPost.descriprion) photoPosts[index].descriprion = photoPost.descriprion;
                if (photoPost.photoLink) photoPosts[index].photoLink = photoPost.photoLink;
                if (photoPost.hashtags) photoPosts[index].hashtags = photoPost.hashtags;
                return true;
            }
            else return false;
        },
        removePhotoPost: function (id) {
            let index = photoPosts.findIndex(elem => elem.id == id);
            if (index !== -1) {
                photoPosts.splice(index, 1);
                return true;
            } else return false;
        }
    }
})();

console.log('All photoPosts:');
console.log(result.getPhotoPosts(0, 12));
console.log("filter by author: {author: 'YanPark'}");
console.log(result.getPhotoPosts(0, 12, { author: 'YanPark' }));
console.log("filter by author and hashtags: {author: 'YanPark',hashtags: ['#природа', '#красота']}");
console.log(result.getPhotoPosts(0, 12, { author: 'YanPark', hashtags: ['#природа', '#красота'] }));
console.log("filter by all: {author: 'YanPark',createdAt: new Date('2018-02-24'),hashtags: ['#природа', '#красота']}");
console.log(result.getPhotoPosts(0, 12, { author: 'YanPark', createdAt: new Date('2018-02-24'), hashtags: ['#природа', '#красота'] }));
console.log("filter with wrong type of filter: '2018-02-24'");
console.log(result.getPhotoPosts(0, 12, '2018-02-24'));
console.log("getPhotoPosts: skip = 9");
console.log(result.getPhotoPosts(9));

console.log("getPhotoPost(10)");
console.log(result.getPhotoPost(10));
console.log("getPhotoPost that does not exist: getPhotoPost(13)")
console.log(result.getPhotoPost(13));

console.log("isValid: {id: '14', descriprion: 'сборная',createdAt: new Date('2018-03-01'),author: 'Иван',photoLink: 'ht.jpg', likes: ['Bobby'],hashtags: ['#победа']}");
console.log(result.validatePhotoPost({ id: '14', descriprion: 'сборная', createdAt: new Date('2018-03-01'), author: 'Иван', photoLink: 'ht.jpg', likes: ['Bobby'], hashtags: ['#победа'] }));
console.log("isValid: {id: '14', descriprion: 'сборная',createdAt: '2018-03-01',author: 'Иван',photoLink: 'ht.jpg', likes: ['Bobby'],hashtags: ['#победа']}");
console.log(result.validatePhotoPost({ id: '14', descriprion: 'сборная', createdAt: '2018-03-01', author: 'Иван', photoLink: 'ht.jpg', likes: ['Bobby'], hashtags: ['#победа'] }));
console.log("isValid: ...hastags:'hi'");
console.log(result.validatePhotoPost({ id: '14', descriprion: 'сборная', createdAt: new Date('2018-03-01'), author: 'Иван', photoLink: 'ht.jpg', likes: ['Bobby'], hashtags: 'hi' }));

console.log("add valid photoPost: photoPost1")
console.log(result.addPhotoPost(photoPost1));
console.log("add not valid photoPost: photoPost2 -- id already exists");
console.log(result.addPhotoPost(photoPost2));
console.log("add not valid photoPost: photoPost3 -- not all fields");
console.log(result.addPhotoPost(photoPost3));
console.log("Posts after that:");
console.log(result.getPhotoPosts(0, 15));

console.log("edit valid: 10, {descriprion: 'hey it is changed',hashtags: ['tag1', 'tag2']}");
console.log(result.editPhotoPost(10, { descriprion: 'hey it is changed', hashtags: ['tag1', 'tag2'] }));
console.log("edit not valid: editPhoto1 -- description>200");
console.log(result.editPhotoPost(3, editPhoto1));
console.log("edit not valid: {photoLink: 13}");
console.log(result.editPhotoPost(5, { photoLink: 13 }));
console.log("edit valid: 2, {createdAt: new Date('2018-02-28T21:00:00'),author: 'YanPark'}");
console.log(result.editPhotoPost(2, { createdAt: new Date('2018-02-28T21:00:00'), author: 'YanPark' }));
console.log("Posts after that:");
console.log(result.getPhotoPosts(0, 15));

console.log("remove -- id=5");
console.log(result.removePhotoPost(5));
console.log("remove -- id=1");
console.log(result.removePhotoPost(1));
console.log("remove -- id=16 -- does not exist");
console.log(result.removePhotoPost(16));
console.log("Posts after that:");
console.log(result.getPhotoPosts(0, 15));