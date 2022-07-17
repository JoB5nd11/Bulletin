const homeBtn = document.getElementById('nav-home');
const calendarBtn = document.getElementById('nav-calendar');
const statsBtn = document.getElementById('nav-stats');
const routineBtn = document.getElementById('nav-routines');
const settingsBtn = document.getElementById('nav-settings');
const mainDiv = document.getElementById('main-content');

// homeBtn.addEventListener('click', () => {
//     if(current_frame == homeBtn) return;
//     current_frame = homeBtn;
//     mainFrame.src = 'pages/home.html';
// });

let xhr = new XMLHttpRequest();
loadPage('pages/home.html')

homeBtn.addEventListener('click', function () {loadPage('pages/home.html')});
calendarBtn.addEventListener('click', function () {loadPage('pages/calendar.html')});
statsBtn.addEventListener('click', function () {loadPage('pages/stats.html')});
routineBtn.addEventListener('click', function () {loadPage('pages/routines.html')});
settingsBtn.addEventListener('click', function () {loadPage('pages/settings.html')});

function loadPage(pagename){
    xhr.open('GET', pagename, true);
    xhr.onreadystatechange = function (){
        if(this.readyState !== 4) return;
        if(this.status !== 200) return;
        mainDiv.innerHTML = this.responseText;
    };
    xhr.send();
}

