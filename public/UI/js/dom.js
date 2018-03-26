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
            document.getElementsByClassName('content')[0].innerHTML = '';
            getPhotoPosts();
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
                <img class="image-position" src="${(post.photoLink.startsWith('http:') ? '' :'/public/UI/') + post.photoLink}" alt="photo">
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
            if (funcModule.addPhotoPost(post)) {
                return true;
            }
            return false;
        },
        getPosts: function (skip = 0, top = 8, filterConfig) {
            if (filter && !filterConfig) {
                filterConfig = filter;
            }
            document.querySelector('.load-more-button').style.display = 'block';
            let posts = funcModule.getPhotoPosts(skip, top, filterConfig);
            filter = filterConfig;
            posts.forEach((elem) => {
                content.appendChild(this.createPost(elem));
            });
        },
        editPost: function (id, post) {
            if (funcModule.editPhotoPost(id, post)) {
                setMainPageFromAddEdit();
                return true;
            }
            return false;
        },
        removePost: function (id) {
            if (funcModule.removePhotoPost(id)) {
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
    if(domModule.getPosts(skip, top, filterConfig)) {
        return true;
    }
    return false;
}
function addPhotoPost(post) {
    if (domModule.addPost(post)) {
        return true;
    }
    return false;
}
function editPhotoPost(id, post) {
    if (domModule.editPost(id, post)) {
        return true;
    }
    return false
}
function removePhotoPost(id) {
    if (domModule.removePost(id)) {
        return true;
    }
    return false;
}

setMainPage();
domModule.setUser();