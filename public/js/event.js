let deleteId;
function deleteEvent(childId) {
    deleteId = childId.parentNode.parentNode.id;
    setQuestionPage();
    event.preventDefault();
}
function deleteOk() {
    removePhotoPost(deleteId);
    document.body.querySelector('.question').remove();
}
function deleteCancel() {
    document.querySelector('.question').remove();
}
function agreeOk() {
    document.querySelector('.agreement').remove();
}
function logOut() {
    domModule.changeUser(null);
    localStorage.setItem('user', 'undefined');
}
function reloadMain() {
    document.querySelector('.content').innerHTML = '';
    domModule.setFilter();
    getPhotoPosts();
}
function loadMore(link) {
    const count = document.getElementsByClassName('post').length;
    getPhotoPosts(count, 8);
    //if (count + 8 >= photoPosts.length) {
      //  link.style.display = 'none';
    //}
}
function signIn() {
    const textName = document.getElementById('input_name').value;
    setMainPage();
    domModule.changeUser(textName);
    localStorage.setItem('user', textName);
}
function getFile() {
    document.getElementById("img-upload").click();
}
function updateImageDisplay() {
    const curFiles = document.getElementById("img-upload").files;
    if (curFiles.length !== 0) {
        document.querySelector('.addphoto-image-size').src = document.getElementById('img-upload').files[0].name;
        document.querySelector('.image-link-input').value = '';
    }
}
function setImageLink() {
    document.querySelector('.addphoto-image-size').src = document.querySelector('.image-link-input').value;
}
function addPhoto() {
    const author = domModule.getUser();
    const likes = [];
    let photoLink;
    const srcLength = document.querySelector('.addphoto-image-size').src.length;
    if (document.querySelector('.addphoto-image-size').src.substr(srcLength - 16) === 'img/addPhoto.jpg' || document.querySelector('.addphoto-image-size').height === 16) {
        photoLink = null;
    }
    else photoLink = document.querySelector('.addphoto-image-size').src;
    let description = document.getElementById('text-form').value;
    let hashtags = description.match(/#[^\s#]*/g);
    description = description.replace(/\n/g, '<br>');
    if (hashtags === null) hashtags = [];
    const createdAt = new Date();
    const post = { description, createdAt, author, photoLink, likes, hashtags };
    addPhotoPost(post);
}
function editPhoto() {
    let photoLink;
    if (document.querySelector('.addphoto-image-size').height === 16) {
        photoLink = null;
    }
    else photoLink = document.querySelector('.addphoto-image-size').src;
    let description = document.getElementById('text-form').value;
    let hashtags = description.match(/#[^\s#]*/g);
    description = description.replace(/\n/g, '<br>');
    if (hashtags === null) hashtags = [];
    let post;
    if (photoLink) post = { description, hashtags, photoLink };
    else post = { description, hashtags };
    const id = document.querySelector('.add-form').getAttribute('id');
    editPhotoPost(id, post);
}
function rewatch(textAreaLink) {
    const textArea = textAreaLink;
    const maxRows = textArea.getAttribute('rows');
    if (event.keyCode == 13) {
        const lines = textArea.value.split('\n');
        if (lines.length > maxRows) { return false; }
        else { return true; }
    }
}
function likeIt(childId) {
    event.preventDefault();
    const id = childId.parentNode.parentNode.parentNode.id;
    let photoPosts = JSON.parse(window.localStorage.posts, function (key, value) {
        if (key == 'createdAt') return new Date(value);
        return value;
    });
    const index = photoPosts.findIndex(elem => elem.id === id);
    if (domModule.getUser() === null) {
        setAgreementPageinMain();
    }
    else {
        if (photoPosts[index].likes.findIndex(item => item === domModule.getUser()) === -1) {
            photoPosts[index].likes.push(domModule.getUser());
            document.getElementById(id).querySelector('.heart-div').innerHTML = '<i class="fa fa-heart fa-2x heart" aria-hidden="true"></i>';
            document.getElementById(id).querySelector('.count-of-likes').textContent = photoPosts[index].likes.length;
        }
        else {
            let index2 = photoPosts[index].likes.findIndex(elem => elem === domModule.getUser());
            photoPosts[index].likes.splice(index2, 1);
            document.getElementById(id).querySelector('.heart-div').innerHTML = '<i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>';
            document.getElementById(id).querySelector('.count-of-likes').textContent = photoPosts[index].likes.length;
        }
    }
    window.localStorage.setItem('posts', JSON.stringify(photoPosts));
}
function logOutFromAddEdit() {
    setMainPage();
    domModule.changeUser(null);
    localStorage.setItem('user', 'undefined');
}
function filterByEnter() {
    if (event.keyCode == 13) {
        return setFilterConfig();
    }
}
function setFilterConfig() {
    let filter = {};
    const authors = document.querySelector('.input1').value.trim().replace(/\s+/g, " ").split(' ');
    const hashtags = document.querySelector('.input2').value.trim().replace(/\s+/g, " ").split(' ');
    const date = document.querySelector('.input3').value;
    if (!authors.includes('')) {
        filter.authors = authors;
    }
    if (!hashtags.includes('')) {
        filter.hashtags = hashtags;
    }
    if (date) {
        filter.createdAt = new Date(date);
    }
    if (JSON.stringify(filter) == "{}") {
        filter = undefined;
        document.querySelector('.load-more-button').style.display = 'block';
    }
    domModule.setFilter(filter);
    document.querySelector('.content').innerHTML = '';
    getPhotoPosts(0, 8, filter);
}