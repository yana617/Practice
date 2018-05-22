const options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};
let filter;
let content;
window.domModule = {
    setContent() {
        [content] = document.getElementsByClassName('content');
    },
    makeUserNameShort(str) {
        const middle = parseInt(str.length / 2, 10);

        const symbols = str.split('');
        const upperSymbols = symbols.filter(item => item === item.toUpperCase());

        if (upperSymbols.length === 2) {
            return upperSymbols[0] + upperSymbols[1];
        }
        if (upperSymbols.length === 0) {
            return (str[0] + str[middle]).toUpperCase();
        }
        if (upperSymbols.length === 1) {
            if (symbols[0] !== upperSymbols[0]) {
                return str[0].toUpperCase() + upperSymbols[0];
            }
        }
        return upperSymbols[0] + str[middle].toUpperCase();
    },
    changeUser(username) {
        if (username === null || typeof username === 'undefined') {
            document.getElementsByClassName('sign')[0].setAttribute('onclick', 'setLogInPage()');
            document.getElementsByClassName('sign')[0].innerHTML = '<i class="fa fa-sign-in signicon2 fa-3x" aria-hidden="true"></i>';
            document.getElementsByClassName('user-name-short')[0].style.display = 'none';
            document.getElementsByClassName('user-name-full')[0].style.display = 'none';
            document.getElementsByClassName('user-name-full')[0].textContent = '';
            document.getElementsByClassName('add-photo')[0].style.display = 'none';
            document.getElementsByClassName('content')[0].innerHTML = '';
            this.getPosts();
        } else {
            document.getElementsByClassName('sign')[0].setAttribute('onclick', 'logOut();');
            document.getElementsByClassName('sign')[0].innerHTML = '<i class="fa fa-sign-out signicon fa-3x" aria-hidden="true"></i>';
            document.getElementsByClassName('add-photo')[0].style.display = 'flex';
            const nameShort = document.getElementsByClassName('user-name-short')[0];
            nameShort.style.display = 'flex';
            nameShort.textContent = this.makeUserNameShort(username);
            const nameFull = document.getElementsByClassName('user-name-full')[0];
            if (document.body.clientWidth < 830) nameFull.style.display = 'none';
            else {
                if (username.length > 13) {
                    nameFull.style.width = '200px';
                    nameShort.style.right = '240px';
                }
                nameFull.style.display = 'flex';
                nameFull.textContent = username;
            }
        }
        return true;
    },
    startPage() {
        if (this.getCookie('session_id') === '') {
            window.setMainPage();
            this.changeUser(null);
        } else {
            window.myFetch.serverRequest('GET', '/setuser')
                .then((data) => {
                    if (data.status === 'ok') {
                        window.setMainPage();
                        window.domModule.changeUser(data.username);
                    }
                })
                .catch(error => console.log(error));
        }
    },
    setFilter(newFilter) {
        filter = newFilter;
    },
    createPost(post) {
        const div = document.createElement('div');
        div.id = post._id;
        div.className = 'post';
        let heart = '<i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>';
        let rightUser = null;
        if (document.querySelector('.user-name-full')) {
            rightUser = document.querySelector('.user-name-full').textContent;
            post.likes.forEach((elem) => {
                if (elem === document.querySelector('.user-name-full').textContent) {
                    heart = '<i class="fa fa-heart fa-2x heart" aria-hidden="true"></i>';
                }
            });
        }
        const isOwner =
            `<div class="edit-delete">
                    <a class="edit" href="#" onclick="setEditPostPage(this)">
                        <i class="fa fa-pencil fa-2x" aria-hidden="true"></i>
                    </a>
                    <a class="delete" href="#" onclick="deleteEvent(event, this)">
                         <i class="fa fa-trash-o iDelete fa-2x" aria-hidden="true"></i>
                     </a>
               </div>`;
        let likes;
        if (post.likes.length > 0) {
            likes = post.likes.join('<br>');
        } else likes = '<br>';
        div.innerHTML = `
                <img class="image-position" src="${post.photoLink}" alt="photo">
                <div class="image-owner-data-info">
                    <span class="user-name-label">${post.author} | ${post.createdAt.toLocaleString('ru', options)}</span>
                    <div class="likes">
                        <a class="heart-div" href="#" onclick="likeIt(event, this)">
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
        if (rightUser === post.author) div.innerHTML = isOwner + div.innerHTML;
        return div;
    },
    addPost(post) {
        window.myFetch.serverRequest('POST', '/addPhotoPost', post)
            .then((data) => {
                if (data.status === 'added') {
                    window.setMainPageFromAddEdit();
                    document.querySelector('.sign').setAttribute('onclick', 'logOut();');
                } else {
                    window.setAgreementPage();
                }
            })
            .catch(error => console.log(error));
    },
    sendPhoto(file) {
        const formData = new FormData();
        formData.append('file', file);
        window.myFetch.serverSendFile('POST', '/uploadImage', formData)
            .then(() => {
                document.querySelector('.addphoto-image-size').src =
                    `/img/${document.querySelector('.user-name-full').textContent}_${document.getElementById('img-upload').files[0].name}`;
            })
            .catch(error => console.log(error));
    },
    getPosts(skip = 0, top = 9, filterConfig) {
        document.querySelector('.load-more-button').style.display = 'block';
        if (filterConfig) {
            filter = filterConfig;
        }
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log('typeError in getPhotoPosts');
            return;
        }
        window.myFetch.serverRequest('POST', `/getPhotoPosts?skip=${skip}&top=${top}`, filter)
            .then((data) => {
                const posts = JSON.parse(JSON.stringify(data.posts), (key, value) => {
                    if (key === 'createdAt') return new Date(value);
                    return value;
                });
                posts.forEach(elem => content.appendChild(this.createPost(elem)));
                if (!data.pagination) document.querySelector('.load-more-button').style.display = 'none';
            })
            .catch(error => console.log(error));
    },
    editPost(id, post) {
        window.myFetch.serverRequest('PUT', `/editPhotoPost?id=${id}`, post)
            .then((data) => {
                if (data.status === 'edited') {
                    window.setMainPageFromAddEdit();
                } else {
                    window.setAgreementPage();
                }
            })
            .catch(error => console.log(error));
    },
    removePost(id) {
        window.myFetch.serverRequest('DELETE', `/removePhotoPost?id=${id}`)
            .then((data) => {
                if (data.status === 'removed') {
                    content.removeChild(document.getElementById(id));
                    const count = document.getElementsByClassName('post').length;
                    this.getPosts(count, 1);
                } else {
                    console.log('error');
                }
            })
            .catch(error => console.log(error));
    },
    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    },
    getCookie(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            const c = ca[i].trimLeft();
            if (c.startsWith(name)) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    removeCookie(key) {
        this.setCookie(key, '', 0);
    },
};

window.getPhotoPosts = (skip = 0, top = 9, filterConfig) => {
    window.domModule.getPosts(skip, top, filterConfig);
};
window.addPhotoPost = (post) => {
    window.domModule.addPost(post);
};
window.editPhotoPost = (id, post) => {
    window.domModule.editPost(id, post);
};
window.removePhotoPost = (id) => {
    window.domModule.removePost(id);
};

window.domModule.startPage();
