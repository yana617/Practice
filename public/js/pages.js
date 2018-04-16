window.getHTML = (function () {
    return {
        HeaderFooter: function () {
            return `
            <header>
                <a href="#" onclick="reloadMain()" class="logo">
                    <div>
                        <div class="icon">
                            <img src="/img/icon.png">
                        </div>
                        <span class="logo-text">PhotoCloud</span>
                    </div>
                </a>
                <div class="add-photo">
                    <a class="add-button" onclick="setAddPostPage()" href="#">Добавить фото</a>
                </div>
                <div class="user-name">
                    <div class="user-name-short"></div>
                    <div class="user-name-full"></div>
                    <a class="sign" href="#" onclick="setLogInPage();">
                        <i class="fa fa-sign-in signicon2 fa-3x" aria-hidden="true"></i>
                    </a>
                </div>
            </header>
            
            <footer>
                <div class="copyright">
                    <p>© 2018 PhotoCloud.by</p>
                    <p>Последние изменения:
                        <span class=footer-text1>11.03.2018</span>
                    </p>
                    <p class="footer-text2">20.03.2018</p>
                </div>
                <div class="editor-info">
                    <p>Сидорова Яна</p>
                    <p>2 курс, 5 группа</p>
                    <p>jana.ru.sidorova@yandex.ru</p>
                </div>
            </footer>`;
        },
        MainPage: function () {
            return `
            <div class="search">
                <div class="search-author-hashtag">
                    <input type="text" maxlength="50" placeholder="Автор" onkeyup="filterByEnter();" class="input1">
                    <input type="text" maxlength="50" placeholder="Хэштеги" onkeyup="filterByEnter();" class="input2">
                </div>
                <div class="search-date">
                    <i class="fa fa-calendar fa-2x" aria-hidden="true"></i>
                    <div class="input-date">
                        <input maxlength="20" type="date" class="input3">
                    </div>
                </div>
                <button type="submit" onclick="setFilterConfig();"></button>
            </div>
            <div class="content">
            </div>
            <button class="load-more-button" onclick="loadMore(this);">Загрузить еще</button>
            `;
        },
        QuestionPage: function () {
            return `
                <div class="question-inner">
                    <p>Вы хотите удалить данный пост?</p>
                    <div class="choose">
                        <button onclick="deleteOk()" class="delete-button">Удалить</button>
                        <button onclick="deleteCancel()" class="cancel-button">Отмена</button> 
                    </div>
                </div>
            `;
        },
        AgreePage: function () {
            return `
                <div class="agreement-block">
                    <p class="agree-info">Проверьте корректность <br>введенных данных</p>
                    <button onclick="agreeOk()" class="agree-button">Хорошо</button> 
                </div>
            `;
        },
        AddPostPage: function () {
            return `
            <div class="add-form">
                <div class="photo-form">
                    <div class="addphoto-image">
                        <img src="/img/addPhoto.jpg" class="addphoto-image-size">
                            <a href="#" onclick="">
                                <div class="plus" onclick="getFile()">
                                    <input type="file" id="img-upload" onchange="updateImageDisplay();" accept="image/*" required />
                                    <span>+</span>
                                </div>
                            </a>
                        </img>   
                    </div>
                </div>
                <div class="description-form">
                    <span class="to-do-info">Описание:</span>
                    <textarea id="text-form" placeholder="Не более 200 символов:)" onkeypress="return rewatch(this);" rows="6" maxlength="180"></textarea>
                    <a href="#" class="submit-button" onclick="addPhoto();">Добавить</a>
                </div>
            </div>
            `;
        },
        EditPostPage: function () {
            return `
            <div class="add-form">
                <div class="photo-form">
                    <div class="addphoto-image">
                        <img src="" class="addphoto-image-size">
                            <a href="#" onclick="">
                                <div class="plus" onclick="getFile()">
                                    <input type="file" id="img-upload" onchange="updateImageDisplay();" accept="image/*" required />
                                    <span>+</span>
                                </div>
                            </a>
                        </img>
                    </div>
                </div>
                <div class="description-form">
                    <span class="to-do-info">Описание:</span>
                    <textarea id="text-form" placeholder="Не более 200 символов:)" onkeypress="return rewatch(this);" rows="6" maxlength="180"></textarea>
                    <a href="#" class="submit-button" onclick="editPhoto();">Сохранить</a>
                </div>
            </div>
            `;
        },
        LogInPage: function () {
            return `
            <div class="main">
                <img src="/img/icon.png" class="icon-link" onclick="setMainPage();"/>
                <div class="input-block">
                    <div class="text-log-in"><span>ВХОД</span></div>
                    <form onsubmit="signIn()">
                        <input class="input-name" type="text" id="input_name" pattern="^[А-ЯЁа-яёa-zA-Z][А-ЯЁа-яёa-zA-Z0-9-_\.]{4,20}$" title="Вы ввели запрещенный символ! Только латиница и цифры." placeholder="Логин" required>
                        <input class="input-password" id="input_password" type="password" maxlength="30" minlength="6" placeholder="Пароль" required>    
                        <div type="submit" class="for-button">
                            <button type='submit'>Войти</button>
                        </div>
                    </form>
                </div>
            </div>`;
        }
    }
})();
function setMainPage() {
    document.body.innerHTML = getHTML.HeaderFooter();
    let mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    mainContainer.innerHTML = getHTML.MainPage();
    document.body.insertBefore(mainContainer, document.querySelector('footer'));
    domModule.setContent();
    getPhotoPosts();
}
function setLogInPage() {
    document.body.innerHTML = getHTML.LogInPage();
    domModule.setFilter();
}
function setAddPostPage() {
    document.querySelector('.add-button').style.display = 'none';
    document.querySelector('.sign').setAttribute('onclick', 'logOutFromAddEdit()');
    document.querySelector('.main-container').className = 'add-main-container';
    document.querySelector('.add-main-container').innerHTML = getHTML.AddPostPage();
    document.querySelector('.logo').setAttribute('onclick', 'setMainPageFromAddEdit()');
    domModule.setFilter();
}
function setMainPageFromAddEdit() {
    document.querySelector('.add-main-container').className = 'main-container';
    document.querySelector('.main-container').innerHTML = getHTML.MainPage();
    document.querySelector('.add-button').style.display = 'flex';
    document.querySelector('.logo').setAttribute('onclick', 'reloadMain()');
    document.querySelector('.sign').setAttribute('onclick', 'logOut();');
    domModule.setContent();
    getPhotoPosts();
}
function setEditPostPage(post) {
    const photoPost = post.parentNode.parentNode;
    const photoLink = photoPost.querySelector('.image-position').src;
    const description = photoPost.querySelector('.text-info').innerHTML.replace(/<br>/g, '\n');
    document.querySelector('.add-button').style.display = 'none';
    document.querySelector('.main-container').className = 'add-main-container';
    document.querySelector('.add-main-container').innerHTML = getHTML.EditPostPage();
    document.querySelector('.add-form').id = post.parentNode.parentNode.id;
    document.querySelector('.sign').setAttribute('onclick', 'logOutFromAddEdit()');
    document.querySelector('.addphoto-image-size').src = photoLink;
    document.querySelector('.logo').setAttribute('onclick', 'setMainPageFromAddEdit()');
    document.getElementById('text-form').innerHTML = description;
    document.getElementById('img-upload').value = '';
}
function setQuestionPage() {
    let question = document.createElement('div');
    question.className = 'question';
    question.innerHTML = getHTML.QuestionPage();
    document.querySelector('.main-container').appendChild(question);
}
function setAgreementPage() {
    let agreement = document.createElement('div');
    agreement.className = 'agreement';
    agreement.innerHTML = getHTML.AgreePage();
    document.querySelector('.add-main-container').appendChild(agreement);
}
function setAgreementPageinMain() {
    let agreement = document.createElement('div');
    agreement.className = 'agreement';
    agreement.innerHTML = getHTML.AgreePage();
    document.querySelector('.main-container').appendChild(agreement);
    document.querySelector('.agree-info').textContent = "Войдите в систему";
}