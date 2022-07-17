const tauriAPI = window.__TAURI__;
console.log(tauriAPI);

const dropdown_form = document.getElementById('dropdown-form');
const round_btn = document.getElementById('round-btn');
const clear_form_btn = document.getElementById('clear-form');
const fixed_check = document.getElementById('fixed-switch');
const toggle_btn_div = document.getElementById('toggle-btn-div');
const final_add_btn = document.getElementById('final-add-btn');
let fixed_elements = document.getElementsByClassName('fixed');
let unfixed_elements = document.getElementsByClassName('unfixed');

window.addEventListener('click', (event) => {
    if(event.target.matches('#add-task-btn') || 
    (!dropdown_form.contains(event.target)) && dropdown_form.classList.contains('show') ||
    event.target.matches('#close-form')){
        dropdown_form.classList.toggle('show');
    }
});

window.addEventListener('load', (event) => {
    showUnfixedElements();
    setFormPlaceholder();
});


function showFixedElements(){
    for(let i = 0; i < fixed_elements.length; i++) fixed_elements[i].style.display = "block";
    for(let i = 0; i < unfixed_elements.length; i++) unfixed_elements[i].style.display = "none";
}

function showUnfixedElements(){
    for(let i = 0; i < fixed_elements.length; i++) fixed_elements[i].style.display = "none";
    for(let i = 0; i < unfixed_elements.length; i++) unfixed_elements[i].style.display = "block";
}

function setFixedToggle(){
    fixed_check.checked = true;
    if(!fixed_check.parentNode.classList.contains('active')){
        fixed_check.parentNode.classList.add('active');
    }
}

function resetFixedToggle(){
    fixed_check.checked = false;
    if(fixed_check.parentNode.classList.contains('active')){
        fixed_check.parentNode.classList.remove('active');
    }
}

function setFormPlaceholder(){
    const taskTitle = document.getElementById('task-title');
    const taskCategory = document.getElementById('task-category');
    const fixedStartTime = document.getElementById('task-starttime');
    const fixedEndTime = document.getElementById('task-endtime');
    const durationTime = document.getElementById('task-duration');
    const minBlock = document.getElementById('task-min-block');
    const maxBlock = document.getElementById('task-max-block');
    const deadline = document.getElementById('task-deadline');

    resetFixedToggle();
    taskTitle.value = "";
    taskCategory.value = "";

    let currentDatetime = new Date();
    let inTwoHours = new Date();
    let inOneDay = new Date(); 
    let inOneWeek = new Date();

    currentDatetime = currentDatetime.getTime() - currentDatetime.getTimezoneOffset() * 60000;
    currentDatetime = new Date(currentDatetime);
    inTwoHours.setDate(currentDatetime.getDate());
    inTwoHours.setHours(currentDatetime.getHours() + 2);
    inOneDay.setDate(currentDatetime.getDate() + 1);
    inOneWeek.setDate(currentDatetime.getDate() + 7);
    inOneWeek.setHours(currentDatetime.getHours()); //somehow doesn't take the timezone

    fixedStartTime.value = currentDatetime.toISOString().substring(0, 16);
    fixedEndTime.value = inTwoHours.toISOString().substring(0, 16);
    deadline.value = inOneWeek.toISOString().substring(0, 16);
    durationTime.placeholder = 120;
    minBlock.placeholder = 15;
    maxBlock.placeholder = 90;

    fixed_check.parentNode.classList.remove('active');
}


function resetPriority(){
    // TODO
}


fixed_check.addEventListener('change', (event) => {
    event.target.checked ? setFixedToggle() : resetFixedToggle();
    event.target.checked ? showFixedElements() : showUnfixedElements();
});

fixed_check.addEventListener('keypress', (event) => {
    if (event.which == 13) fixed_check.checked = !fixed_check.checked;
    fixed_check.dispatchEvent(new Event('change'));
});

dropdown_form.addEventListener('submit', (event) => {
    event.preventDefault();
});

clear_form_btn.addEventListener('click', (event) => {
    setFormPlaceholder();
    showUnfixedElements();
});

final_add_btn.addEventListener('keypress', (event) => {
    if (event.which == 13) final_add_btn.click();
});

final_add_btn.addEventListener('click', (event) => {
    tauriAPI.invoke('add_task_to_file', {});
});
