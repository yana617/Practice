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
            if (localStorage.getItem('user') === 'undefined') {
                this.changeUser(null);
            }
            else this.changeUser(localStorage.getItem('user'));
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
            div.innerHTML = `
                <img class="image-position" src="` + post.photoLink + `" alt="photo">
                <div class="image-owner-data-info">
                    <span class="user-name-label">` + post.author + ' | ' + post.createdAt.toLocaleString("ru", options) + `</span>
                    <div class="likes">
                        <a class="heart-div" href="#" onclick="likeIt(this)">`
                + heart + `
                        </a>
                        <div class="likes-count">
                            <span class="count-of-likes">`+ post.likes.length + `</span>
                        </div>
                    </div>
                </div>
                <div class="image-text">
                    <p class="text-info">` + post.description + `</p>
                </div>`;
            if (user === post.author) div.innerHTML = isOwner + div.innerHTML;
            return div;
        },
        addPost: function (post) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/addPhotoPost', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(post));
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setMainPageFromAddEdit();
                    document.querySelector('.sign').setAttribute('onclick', 'logOut();');
                } else if (xhr.status === 400) {
                    setAgreementPage();
                }
            };
        },
        getPosts: function (skip = 0, top = 8, filterConfig) {
            if (filter && !filterConfig) {
                filterConfig = filter;
            }
            document.querySelector('.load-more-button').style.display = 'block';
            filter = filterConfig;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `/getPhotoPosts?skip=${skip}&top=${top}`, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(filterConfig));
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let result = JSON.parse(xhr.response, (key, value) => {
                        if (key == 'createdAt') return new Date(value);
                        return value;
                    });
                    result.posts.forEach((elem) => {
                        content.appendChild(this.createPost(elem));
                    });
                    if (!result.pagination) document.querySelector('.load-more-button').style.display = 'none';
                } else if (xhr.status === 400) {
                    console.log("error");

                }
            };
        },
        editPost: function (id, post) {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', `/editPhotoPost?id=${id}`, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(post));
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setMainPageFromAddEdit();
                } else if (xhr.status === 400) {
                    setAgreementPage();
                }
            };
        },
        removePost: function (id) {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', `/removePhotoPost?id=${id}`, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    content.removeChild(document.getElementById(id));
                    let count = document.getElementsByClassName('post').length;
                    this.getPosts(count, 1);
                } else if (xhr.status === 400) {
                    console.log("error");
                }
            };
        }
    }
})();

function getPhotoPosts(skip = 0, top = 8, filterConfig) {
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

setMainPage();
domModule.setUser();