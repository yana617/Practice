var options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

window.domModule = (function () {
    let user = null;
    let userShort = null;
    let filter;
    let content;
    return {
        setContent: function () {
            content = document.getElementsByClassName("content")[0];
        },
        makeUserNameShort: function (str) {
            let j = 0; let nameForShort = ""; let pos, middle;
            middle = parseInt(str.length / 2);

            for (let i = 0; i < str.length; i++) {
                if (str[i] === str[i].toUpperCase()) {
                    nameForShort += str[i];
                    j++; pos = i;
                    if (j == 2) break;
                }
            }
            if (j == 2) {
                return nameForShort;
            }
            else {
                if (j == 0) {
                    return (str[0] + str[middle]).toUpperCase();
                }
                else if (j == 1) {
                    if (pos != 0) {
                        return str[0].toUpperCase() + str[pos];
                    }
                    else {
                        return str[0] + str[middle].toUpperCase();
                    }
                }
            }
        },
        changeUser: function (username) {
            if (username === null || typeof username === undefined) {
                user = null;
                document.getElementsByClassName('sign')[0].setAttribute('onclick', 'setLogInPage()');
                document.getElementsByClassName('sign')[0].innerHTML = '<i class="fa fa-sign-in signicon2 fa-3x" aria-hidden="true"></i>';
                document.getElementsByClassName('user-name-short')[0].style.display = 'none';
                document.getElementsByClassName('user-name-full')[0].style.display = 'none';
                document.getElementsByClassName('add-photo')[0].style.display = 'none';
                document.getElementsByClassName('content')[0].innerHTML = '';
                this.getPosts();
            }
            else {
                if (user === null || typeof username === undefined) {
                    document.getElementsByClassName('sign')[0].setAttribute('onclick', 'logOut();');
                    document.getElementsByClassName('sign')[0].innerHTML = '<i class="fa fa-sign-out signicon fa-3x" aria-hidden="true"></i>';
                    document.getElementsByClassName('add-photo')[0].style.display = 'flex';
                }
                user = username;
                let nameShort = document.getElementsByClassName('user-name-short')[0];
                nameShort.style.display = 'flex';
                userShort = this.makeUserNameShort(user);
                nameShort.textContent = userShort;
                let nameFull = document.getElementsByClassName('user-name-full')[0];
                if (document.body.clientWidth < 830) nameFull.style.display = 'none';
                else {
                    if (user.length > 13) {
                        nameFull.style.width = '200px';
                        nameShort.style.right = '240px';
                    }
                    nameFull.style.display = 'flex';
                    nameFull.textContent = user;
                }
            }
            return true;
        },
        getUser: function () {
            return user;
        },
        setUser: function () {
            if (localStorage.getItem('photocloud-user') === 'undefined') {
                this.changeUser(null);
            }
            else this.changeUser(localStorage.getItem('photocloud-user'));
        },
        setFilter: function (newFilter) {
            filter = newFilter;
        },
        createPost: function (post) {
            let div = document.createElement('div');
            div.id = post.id;
            div.className = "post";
            let heart = '<i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>';
            if (user) {
                post.likes.forEach((elem) => {
                    if (elem === user)
                        heart = '<i class="fa fa-heart fa-2x heart" aria-hidden="true"></i>';
                });
            }
            let isOwner =
                `<div class="edit-delete">
                    <a class="edit" href="#" onclick="setEditPostPage(this)">
                        <i class="fa fa-pencil fa-2x" aria-hidden="true"></i>
                    </a>
                    <a class="delete" href="#" onclick="deleteEvent(this)">
                         <i class="fa fa-trash-o iDelete fa-2x" aria-hidden="true"></i>
                     </a>
               </div>`;
            let likes;
            if (post.likes.length > 0) {
                likes = post.likes[0];
                for (let i = 1; i < post.likes.length; i++) {
                    likes += `<br>${post.likes[i]}`;
                }
            } else likes = '<br>';
            div.innerHTML = `
                <img class="image-position" src="${post.photoLink}" alt="photo">
                <div class="image-owner-data-info">
                    <span class="user-name-label">${post.author} |  ${post.createdAt.toLocaleString("ru", options)}</span>
                    <div class="likes">
                        <a class="heart-div" href="#" onclick="likeIt(this)">
                            ${heart}
                        </a>
                        <div class="likes-count">
                            <span class="count-of-likes">${post.likes.length}</span>
                        </div>
                        <div class="show-likes">
                            ${likes}
                        </div>
                    </div>
                </div>
                <div class="image-text">
                    <p class="text-info">${post.description}</p>
                </div>`;
            if (user === post.author) div.innerHTML = isOwner + div.innerHTML;
            return div;
        },
        addPost: function (post) {
            myFetch.serverRequest('POST', `/addPhotoPost`, post)
                .then(data => {
                    setMainPageFromAddEdit();
                    document.querySelector('.sign').setAttribute('onclick', 'logOut();');
                })
                .catch(error => setAgreementPage())
        },
        sendPhoto: function (file) {
            var formData = new FormData();
            formData.append('file', file);
            myFetch.serverSendFile('POST', `/uploadImage`, formData)
                .then(() => {
                    document.querySelector('.addphoto-image-size').src = '/img/' + document.getElementById('img-upload').files[0].name;
                })
                .catch(error => console.log(error))
        },
        getPosts: function (skip = 0, top = 9, filterConfig) {
            if (filter && !filterConfig) {
                filterConfig = filter;
            }
            document.querySelector('.load-more-button').style.display = 'block';
            filter = filterConfig;

            myFetch.serverRequest('POST', `/getPhotoPosts?skip=${skip}&top=${top}`, filterConfig)
                .then(data => {
                    let posts = JSON.parse(JSON.stringify(data.posts), (key, value) => {
                        if (key == 'createdAt') return new Date(value);
                        return value;
                    });
                    posts.forEach((elem) => {
                        content.appendChild(this.createPost(elem));
                    });
                    if (!data.pagination) document.querySelector('.load-more-button').style.display = 'none';
                })
                .catch(error => console.error(error));
        },
        editPost: function (id, post) {
            myFetch.serverRequest('PUT', `/editPhotoPost?id=${id}`, post)
                .then(() => {
                    setMainPageFromAddEdit();
                })
                .catch(() => setAgreementPage());
        },
        removePost: function (id) {
            myFetch.serverRequest('DELETE', `/removePhotoPost?id=${id}`)
                .then(() => {
                    content.removeChild(document.getElementById(id));
                    let count = document.getElementsByClassName('post').length;
                    this.getPosts(count, 1);
                })
                .catch(error => console.log(error))
        }
    }
})();

function getPhotoPosts(skip = 0, top = 9, filterConfig) {
    domModule.getPosts(skip, top, filterConfig);
}
function addPhotoPost(post) {
    domModule.addPost(post);
}
function editPhotoPost(id, post) {
    domModule.editPost(id, post);
}
function removePhotoPost(id) {
    domModule.removePost(id);
}

if (!localStorage.getItem('photocloud-user')) {
    localStorage.setItem('photocloud-user', 'undefined');
}
setMainPage();
domModule.setUser();