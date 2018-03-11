var photoPosts = [
    {
        id: '1',
        description: 'Спать! #сон #cute',
        createdAt: new Date('2018-03-09T13:41:00'),
        author: 'CatVlog',
        photoLink: 'img/IMG1.jpg',
        likes: ['Bobby', 'HiWorld'],
        hashtags: ['#сон', '#cute']
    },
    {
        id: '2',
        description: 'Save homeless dog! You can do it! #help#home#wannahome',
        createdAt: new Date('2018-03-05T21:00:00'),
        author: 'KateK',
        photoLink: 'img/IMGP2622.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '3',
        description: 'Как красиво! #природа #красота #мир',
        createdAt: new Date('2018-03-03T21:00:00'),
        author: 'YanPark',
        photoLink: 'img/IMGP2620.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#природа', '#красота', '#мир']
    },
    {
        id: '4',
        description: '#кубик',
        createdAt: new Date('2018-03-02T21:15:00'),
        author: 'YanPark',
        photoLink: 'img/IMG2.jpg',
        likes: ['MишаК'],
        hashtags: ['#кубик']
    },
    {
        id: '5',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!! #победа',
        createdAt: new Date('2018-03-01T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#победа']
    },

    {
        id: '6',
        description: 'Спать! #сон#cute',
        createdAt: new Date('2018-02-28T21:12:00'),
        author: 'CatVlog',
        photoLink: 'img/IMG1.jpg',
        likes: ['Bobby', 'HiWorld'],
        hashtags: ['#сон', '#cute']
    },
    {
        id: '7',
        description: 'Save homeless dog! You can do it! #help#home#wannahome',
        createdAt: new Date('2018-02-27T21:00:00'),
        author: 'Ki North',
        photoLink: 'img/IMGP2622.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '8',
        description: 'Милый кот хочет кушать! #спаси_его',
        createdAt: new Date('2018-02-24T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'img/IMGP2621.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    },
    {
        id: '9',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!! #победа',
        createdAt: new Date('2018-02-22T23:15:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby', 'YanPark'],
        hashtags: ['#победа']
    },
    {
        id: '10',
        description: 'Милый кот хочет кушать! #спаси_его',
        createdAt: new Date('2018-02-20T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'img/IMGP2621.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    },
    {
        id: '11',
        description: '#кубик',
        createdAt: new Date('2018-02-20T12:35:00'),
        author: 'YanPark',
        photoLink: 'img/IMG2.jpg',
        likes: ['MишаК'],
        hashtags: ['#кубик']
    },
    {
        id: '12',
        description: 'Save homeless dog! You can do it! #help#home#wannahome',
        createdAt: new Date('2018-02-19T21:00:00'),
        author: 'Ki North',
        photoLink: 'img/IMGP2622.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '13',
        description: 'Как красиво! #природа #красота',
        createdAt: new Date('2018-02-17T21:00:00'),
        author: 'YanPark',
        photoLink: 'img/IMGP2620.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#природа', '#красота']
    },
    {
        id: '14',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!! #победа',
        createdAt: new Date('2018-02-15T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#победа']
    },
    {
        id: '15',
        description: 'Милый кот хочет кушать! #спаси_его',
        createdAt: new Date('2018-02-14T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'img/IMGP2621.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    },
    {
        id: '16',
        description: 'Save homeless dog! You can do it! #help#home#wannahome',
        createdAt: new Date('2018-02-12T21:00:00'),
        author: 'Ki North',
        photoLink: 'img/IMGP2622.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    },
    {
        id: '17',
        description: 'Как красиво! #природа #красота #мир',
        createdAt: new Date('2018-02-11T21:00:00'),
        author: 'YanPark',
        photoLink: 'img/IMGP2620.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#природа', '#красота', '#мир']
    },
    {
        id: '18',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!! #победа',
        createdAt: new Date('2018-02-09T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#победа']
    },
    {
        id: '19',
        description: 'Милый кот хочет кушать! #спаси_его',
        createdAt: new Date('2018-02-07T14:15:00'),
        author: 'Оля Мика',
        photoLink: 'img/IMGP2621.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#спаси_его']
    },
    {
        id: '20',
        description: 'Save homeless dog! You can do it! #help#home#wannahome',
        createdAt: new Date('2018-02-05T21:00:00'),
        author: 'Ki North',
        photoLink: 'img/IMGP2622.jpg',
        likes: ['MarkL', 'Bobby'],
        hashtags: ['#help', '#home', '#wannahome']
    }
];

window.funcModul = (function () {
    return {
        getPhotoPosts: function (skip = 0, top = 8, filterConfig) {
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
                photoPosts.push(photoPost);
                photoPosts.sort((elem1, elem2) => elem2.createdAt - elem1.createdAt);
                return true;
            }
            else {
                console.log("Is not valid photoPost");
                return false;
            }
        },
        validateEditedPost: function (post) {
            if (post.description)
                if (post.description.length === 0 || post.description.length > 200 || typeof post.description !== 'string') return false;
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
            if (this.validateEditedPost(photoPost)) {
                let index = photoPosts.findIndex(elem => elem.id == id);
                if (index !== -1) {
                    if (photoPost.description) photoPosts[index].description = photoPost.description;
                    if (photoPost.photoLink) photoPosts[index].photoLink = photoPost.photoLink;
                    if (photoPost.hashtags) photoPosts[index].hashtags = photoPost.hashtags;
                    return true;
                }
            }
            return false;
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