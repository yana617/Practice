let postForAdd = {
    id: '21',
    description: 'Милый кот хочет кушать! #спаси_его',
    createdAt: new Date('2018-03-10T14:15:00'),
    author: 'Оля Мика',
    photoLink: 'img/IMGP2621.jpg',
    likes: ['MarkL', 'Bobby'],
    hashtags: ['#спаси_его']
}
let postForEdit = {
    description: 'Как красиво! Безумно красиво! #природа #красота #мир #нереально',
    hashtags: ['#природа', '#красота', '#мир', '#нереально']
}

var options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

window.domModul = (function () {
    let user = 'YanPark';
    let content = document.getElementsByClassName("content")[0];
    return {
        changeUser: function (username) {
            if (username === null) {
                user=username;
                document.getElementsByClassName('sign')[0].innerHTML = '<i class="fa fa-sign-in signicon2 fa-3x" aria-hidden="true"></i>';
                document.getElementsByClassName('userNameShort')[0].style.display='none';
                document.getElementsByClassName('userNameFull')[0].style.display='none';
                document.getElementsByClassName('addPhoto')[0].style.display='none';
            }
            else {
                if(username.length>15) return false;
                if(user===null) {
                    document.getElementsByClassName('sign')[0].innerHTML = '<i class="fa fa-sign-out signicon fa-3x" aria-hidden="true"></i>';
                    document.getElementsByClassName('addPhoto')[0].style.display='flex';
                }
                user = username;
                let nameShort = document.getElementsByClassName('userNameShort')[0];
                nameShort.style.display='flex';
                let j = 0; let nameForShort = ""; let pos;
                if (user.split(' ').length == 1) {
                    for (let i = 0; i < user.length; i++) {
                        if (user[i] === user[i].toUpperCase()) {
                            nameForShort += user[i];
                            j++; pos = i;
                            if (j == 2) break;
                        }
                    }
                    if (j == 2) nameShort.textContent = nameForShort;
                    else {
                        if (j == 0) nameShort.innerHTML = user[0].toUpperCase() + user[user.length / 2].toUpperCase();
                        else if (j == 1) {
                            if (pos != 0) nameShort.innerHTML = user[0].toUpperCase() + user[pos];
                            else nameShort.innerHTML = user[0] + user[user.length / 2].toUpperCase();
                        }
                    }
                }
                else {
                    let userNames = user.split(' ');
                    nameShort.innerHTML = (userNames[0][0] + userNames[1][0]).toUpperCase();
                }
                let nameFull = document.getElementsByClassName('userNameFull')[0];
                nameFull.style.display='flex';
                nameFull.innerHTML = user;
            }
            getPhotoPosts()
            return true;
        },
        createPost: function (post) {
            let div = document.createElement('div');
            div.id = post.id;
            div.className = "post";
            let heart = '<i class="fa fa-heart-o fa-2x" aria-hidden="true">' + post.likes.length + '</i>';
            if (user) {
                post.likes.forEach((elem) => {
                    if (elem === user)
                        heart = '<i class="fa fa-heart fa-2x heart" aria-hidden="true">' + post.likes.length + '</i>';
                });
            }
            let isOwner = '<div class="editDelete"><a class="edit" href="#"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></a>' +
                '<a class="delete" href="#"><i class="fa fa-trash-o iDelete fa-2x" aria-hidden="true"></i></a></div>';
            div.innerHTML = '<img class="imagePosition" src="' + post.photoLink + '" alt="photo"><div class="imageOwnerDataInfo">' +
                '<span class="userNameLabel">' + post.author + ' | ' + post.createdAt.toLocaleString("ru", options) + '</span>' +
                heart + '</div><div class="imageText"><p>' + post.description + '</p></div>';
            if (user === post.author) div.innerHTML = isOwner + div.innerHTML;
            return div;
        },
        addPost: function (post) {
            if (funcModul.addPhotoPost(post)) {
                content.innerHTML = '';
                this.getPosts();
                return true;
            }
            return false;
        },
        getPosts: function (skip = 0, top = 8, filterConfig) {
            let posts = funcModul.getPhotoPosts(skip, top, filterConfig);
            posts.forEach((elem) => {
                content.appendChild(this.createPost(elem));
            });
        },
        editPost: function (id, post) {
            if (funcModul.editPhotoPost(id, post)) {
                content.replaceChild(this.createPost(funcModul.getPhotoPost(id)), document.getElementById(id));
                return true;
            }
            return false;
        },
        removePost: function (id) {
            if (funcModul.removePhotoPost(id)) {
                content.removeChild(document.getElementById(id));
                let count = document.getElementsByClassName('post').length;
                this.getPosts(count, 1);
                return true;
            }
            return false;
        }
    }
})();

function getPhotoPosts(skip = 0, top = 8, filterConfig) {
    let content = document.getElementsByClassName('content')[0];
    content.innerHTML = '';
    domModul.getPosts(skip, top, filterConfig);
}
function addPhotoPost(post) {
    if (domModul.addPost(post)) return true;
    return false;
}
function editPhotoPost(id, post) {
    if (domModul.editPost(id, post)) return true;
    return false
}
function removePhotoPost(id) {
    if (domModul.removePost(id)) return true;
    return false;
}

getPhotoPosts();
console.log("You can try:");
console.log("domModul.changeUser(null);");
console.log("domModul.changeUser('KateK');");
console.log("addPhotoPost(postForAdd);");
console.log("removePhotoPost(5);");
console.log("editPhotoPost(2, postForEdit);");
console.log("getPhotoPosts(undefined, undefined, {hashtags: ['#победа']});");