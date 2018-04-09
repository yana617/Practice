//localStorage.clear();
if (!localStorage.getItem('posts')) {
    var photoPosts = [
        {
            id: '9',
            description: 'Спать! #сон #cute',
            createdAt: new Date('2018-03-09T13:41:00'),
            author: 'CatVlog',
            photoLink: '/public/img/IMG1.jpg',
            likes: ['Bobby', 'HiWorld'],
            hashtags: ['#сон', '#cute']
        },
        {
            id: '8',
            description: 'Wow! #nature',
            createdAt: new Date('2018-03-07T08:25'),
            author: 'naturePhoto',
            photoLink: '/public/img/IMG4.jpg',
            likes: ['Bobby', 'MarkK', 'ИванИванов'],
            hashtags: ['#nature']
        },
        {
            id: '7',
            description: 'Save homeless dog! You can do it! #help#home#wannahome',
            createdAt: new Date('2018-03-05T21:00:00'),
            author: 'KateK',
            photoLink: '/public/img/IMGP2622.jpg',
            likes: ['MarkL', 'Bobby'],
            hashtags: ['#help', '#home', '#wannahome']
        },
        {
            id: '6',
            description: 'Как красиво! #природа #красота #мир',
            createdAt: new Date('2018-03-03T21:00:00'),
            author: 'YanPark',
            photoLink: '/public/img/IMGP2620.jpg',
            likes: ['MarkL', 'Bobby'],
            hashtags: ['#природа', '#красота', '#мир']
        },
        {
            id: '5',
            description: '#кубик',
            createdAt: new Date('2018-03-02T21:15:00'),
            author: 'YanPark',
            photoLink: '/public/img/IMG2.jpg',
            likes: ['MишаК'],
            hashtags: ['#кубик']
        },
        {
            id: '4',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!! #победа',
            createdAt: new Date('2018-03-01T23:00:00'),
            author: 'ИвановИван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
            likes: ['MarkL', 'Bobby'],
            hashtags: ['#победа']
        },
        {
            id: '3',
            description: 'Милый кот хочет кушать! #спаси_его',
            createdAt: new Date('2018-02-24T14:15:00'),
            author: 'ОляМика',
            photoLink: '/public/img/IMGP2621.jpg',
            likes: ['MarkL', 'Bobby'],
            hashtags: ['#спаси_его']
        },
        {
            id: '2',
            description: 'Wow! It is so unreal! #reality #nature',
            createdAt: new Date('2018-02-20T23:45'),
            author: 'naturePhoto',
            photoLink: '/public/img/IMG3.jpg',
            likes: ['Bobby', 'YanPark', 'ИванИванов'],
            hashtags: ['#reality', '#nature']
        },
        {
            id: '1',
            description: '#wings',
            createdAt: new Date('2018-02-18T13:03'),
            author: 'Bobby',
            photoLink: '/public/img/IMG5.jpg',
            likes: ['Bobby', 'YanPark', 'ИванИванов', 'MarkK', 'naturePhoto'],
            hashtags: ['#wings']
        }
    ];
    window.localStorage.setItem('id', 10);
    window.localStorage.setItem('posts', JSON.stringify(photoPosts));
}
var photoPosts = [];

window.funcModule = (function () {
    return {
        getPhotoPosts: function (skip = 0, top = 8, filterConfig) {
            if (typeof skip !== 'number' || typeof top !== 'number') {
                console.log("typeError in getPhotoPosts");
                return;
            }
            photoPosts = JSON.parse(window.localStorage.posts, function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            if (filterConfig === undefined) {
                if (photoPosts.slice(skip + top).length === 0) {
                    document.querySelector('.load-more-button').style.display = 'none';
                }
                return photoPosts.slice(skip, skip + top);
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
                if (photoFilterResult.slice(skip, skip + top).length <= 8 && photoFilterResult.slice(skip + top).length === 0) {
                    document.querySelector('.load-more-button').style.display = 'none';
                }
                return photoFilterResult.slice(skip, skip + top);
            }
        },
        getPhotoPost: function (id) {
            return photoPosts.find(elem => elem.id == id);
        },
        validatePhotoPost: function (photoPost) {
            if (typeof photoPost.description !== 'string' || photoPost.description.length > 200 || photoPost.description.length === 0) return false;
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
                photoPosts = JSON.parse(window.localStorage.posts, function (key, value) {
                    if (key == 'createdAt') return new Date(value);
                    return value;
                });
                photoPosts.push(photoPost);
                photoPosts.sort((elem1, elem2) => elem2.createdAt - elem1.createdAt);
                localStorage.setItem('posts', JSON.stringify(photoPosts));
                return true;
            }
            else {
                console.log("Is not valid photoPost");
                return false;
            }
        },
        validateEditedPost: function (post) {
            if (post.description.length === 0 || post.description.length > 200 || typeof post.description !== 'string') return false;
            if (typeof post.photoLink !== 'string' || post.photoLink.length === 0) return false;
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
            if (this.validateEditedPost(photoPost)) {
                let index = photoPosts.findIndex(elem => elem.id == id);
                if (index !== -1) {
                    photoPosts = JSON.parse(window.localStorage.posts, function (key, value) {
                        if (key == 'createdAt') return new Date(value);
                        return value;
                    });
                    if (photoPost.description) { photoPosts[index].description = photoPost.description; }
                    if (photoPost.hashtags) { photoPosts[index].hashtags = photoPost.hashtags; }
                    if (photoPost.photoLink) { photoPosts[index].photoLink = photoPost.photoLink; }
                    window.localStorage.setItem('posts', JSON.stringify(photoPosts));
                    return true;
                }
            }
            return false;
        },
        removePhotoPost: function (id) {
            let index = photoPosts.findIndex(elem => elem.id == id);
            if (index !== -1) {
                photoPosts = JSON.parse(window.localStorage.posts, function (key, value) {
                    if (key == 'createdAt') return new Date(value);
                    return value;
                });
                photoPosts.splice(index, 1);
                window.localStorage.setItem('posts', JSON.stringify(photoPosts));
                return true;
            } else return false;
        }
    }
})();