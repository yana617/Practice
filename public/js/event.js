let deleteId;
window.deleteEvent = (event, child) => {
    deleteId = child.parentNode.parentNode.id;
    window.setQuestionPage();
    event.preventDefault();
};
window.deleteOk = () => {
    window.removePhotoPost(deleteId);
    document.body.querySelector('.question').remove();
};
window.deleteCancel = () => {
    document.querySelector('.question').remove();
};
window.agreeOk = () => {
    document.querySelector('.agreement').remove();
};
window.logOut = () => {
    window.domModule.changeUser(null);
    localStorage.setItem('photocloud-user', 'undefined');
};
window.reloadMain = () => {
    document.querySelector('.content').innerHTML = '';
    window.domModule.setFilter();
    window.getPhotoPosts();
};
window.loadMore = () => {
    const count = document.getElementsByClassName('post').length;
    window.getPhotoPosts(count, 9);
};
window.signIn = () => {
    const textName = document.getElementById('input_name').value;
    window.setMainPage();
    window.domModule.changeUser(textName);
    localStorage.setItem('photocloud-user', textName);
};
window.getFile = () => {
    document.getElementById('img-upload').click();
};
window.updateImageDisplay = () => {
    const curFiles = document.getElementById('img-upload').files;
    if (curFiles.length !== 0) {
        window.domModule.sendPhoto(document.getElementById('img-upload').files[0]);
    }
};
window.addPhoto = () => {
    const author = window.domModule.getUser();
    const likes = [];
    let photoLink;
    const srcLength = document.querySelector('.addphoto-image-size').src.length;
    if (document.querySelector('.addphoto-image-size').src.substr(srcLength - 16) === 'img/addPhoto.jpg' || document.querySelector('.addphoto-image-size').height === 16) {
        photoLink = null;
    } else {
        photoLink = document.querySelector('.addphoto-image-size').src;
    }
    let description = document.getElementById('text-form').value;
    let hashtags = description.match(/#[^\s#]*/g);
    description = description.replace(/\n/g, '<br>');
    if (hashtags === null) hashtags = [];
    const createdAt = new Date();
    const post = {
        description,
        createdAt,
        author,
        photoLink,
        likes,
        hashtags,
    };
    window.addPhotoPost(post);
};
window.editPhoto = () => {
    let photoLink;
    if (document.querySelector('.addphoto-image-size').height === 16) {
        photoLink = null;
    } else photoLink = document.querySelector('.addphoto-image-size').src;
    let description = document.getElementById('text-form').value;
    let hashtags = description.match(/#[^\s#]*/g);
    description = description.replace(/\n/g, '<br>');
    if (hashtags === null) hashtags = [];
    let post;
    if (photoLink) post = { description, hashtags, photoLink };
    else post = { description, hashtags };
    const id = document.querySelector('.add-form').getAttribute('id');
    window.editPhotoPost(id, post);
};
window.rewatch = (event, child) => {
    const textArea = child;
    const maxRows = textArea.getAttribute('rows');
    if (event.keyCode === 13) {
        const lines = textArea.value.split('\n');
        if (lines.length > maxRows) { return false; }
        return true;
    }
    return 0;
};
window.likeIt = (event, childId) => {
    event.preventDefault();
    const myId = childId.parentNode.parentNode.parentNode.id;
    if (window.domModule.getUser() === null) {
        window.setAgreementPageinMain();
    } else {
        let likes = document.getElementById(myId).querySelector('.show-likes').innerHTML.replace(/<br>/g, ' ').trim().split(' ');
        likes = likes.filter(elem => elem.length > 0);
        if (likes.findIndex(item => item === window.domModule.getUser()) === -1) {
            likes.push(window.domModule.getUser());
            const newLikes = likes.join('<br>');
            document.getElementById(myId).querySelector('.show-likes').innerHTML = newLikes;
            document.getElementById(myId).querySelector('.heart-div').innerHTML = '<i class="fa fa-heart fa-2x heart" aria-hidden="true"></i>';
            document.getElementById(myId).querySelector('.count-of-likes').textContent = likes.length;
        } else {
            const index2 = likes.findIndex(elem => elem === window.domModule.getUser());
            likes.splice(index2, 1);
            if (likes.length > 0) {
                const newLikes = likes.join('<br>');
                document.getElementById(myId).querySelector('.show-likes').innerHTML = newLikes;
            } else document.getElementById(myId).querySelector('.show-likes').innerHTML = '';
            document.getElementById(myId).querySelector('.heart-div').innerHTML = '<i class="fa fa-heart-o fa-2x" aria-hidden="true"></i>';
            document.getElementById(myId).querySelector('.count-of-likes').textContent = likes.length;
        }
        const post = {}; post.likes = likes;
        window.myFetch.serverRequest('PUT', `/editPhotoPost?id=${myId}`, post)
            .catch(() => console.log('error'));
    }
};
window.logOutFromAddEdit = () => {
    window.setMainPage();
    window.domModule.changeUser(null);
    localStorage.setItem('photocloud-user', 'undefined');
};
window.filterByEnter = (event) => {
    if (event.keyCode === 13) {
        return window.setFilterConfig();
    }
    return 0;
};
window.setFilterConfig = () => {
    let filter = {};
    const authors = document.querySelector('.input1').value.trim().replace(/\s+/g, ' ').split(' ');
    const hashtags = document.querySelector('.input2').value.trim().replace(/\s+/g, ' ').split(' ');
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
    if (JSON.stringify(filter) === '{}') {
        filter = undefined;
        document.querySelector('.load-more-button').style.display = 'block';
    }
    window.domModule.setFilter(filter);
    document.querySelector('.content').innerHTML = '';
    window.getPhotoPosts(0, 9, filter);
};
