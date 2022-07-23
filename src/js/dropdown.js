import { uid } from "./utils/generators.js";

const tauriAPI = window.__TAURI__;

const dropdown_form = document.getElementById('dropdown-form');
const clear_form_btn = document.getElementById('clear-form');
const is_fixed = document.getElementById('fixed-switch');
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
    is_fixed.checked = true;
    if(!is_fixed.parentNode.classList.contains('active')){
        is_fixed.parentNode.classList.add('active');
    }
}

function resetFixedToggle(){
    is_fixed.checked = false;
    if(is_fixed.parentNode.classList.contains('active')){
        is_fixed.parentNode.classList.remove('active');
    }
}

function setFormPlaceholder(){resetFixedToggle();
    document.getElementById('task-title').value = "";
    document.getElementById('task-category').value = "";

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

    document.getElementById('task-starttime').value = currentDatetime.toISOString().substring(0, 16);
    document.getElementById('task-endtime').value = inTwoHours.toISOString().substring(0, 16);
    document.getElementById('task-deadline').value = inOneWeek.toISOString().substring(0, 16);
    document.getElementById('task-duration').placeholder = 120;
    document.getElementById('task-min-block').placeholder = 15;
    document.getElementById('task-max-block').placeholder = 90;

    is_fixed.parentNode.classList.remove('active');
    for(let i = 1; i <= 5; i++){
        document.getElementById('star-' + i.toString()).classList.remove('active');
    }
    document.getElementById('real-priority').value = 1;
}

function get_data_from_form(){
    let data;
    if(is_fixed.checked){
        return {
            id: uid(),
            fixed: true,
            title: document.getElementById('task-title').value,
            start_time: document.getElementById('task-starttime').value,
            end_time: document.getElementById('task-endtime').value,
            category: document.getElementById('task-category').value
        };
    }else{
        return {
            id: uid(),
            fixed: false,
            title: document.getElementById('task-title').value,
            duration: document.getElementById('task-duration').value,
            min_block: document.getElementById('task-min-block').value,
            max_block: document.getElementById('task-max-block').value,
            deadline: document.getElementById('task-deadline').value,
            category: document.getElementById('task-category').value,
            priority: document.getElementById('real-priority').value
        }; 
    }
}

is_fixed.addEventListener('change', (event) => {
    event.target.checked ? setFixedToggle() : resetFixedToggle();
    event.target.checked ? showFixedElements() : showUnfixedElements();
});

is_fixed.addEventListener('keypress', (event) => {
    if (event.which == 13 && this === document.activeElement) is_fixed.checked = !is_fixed.checked;
    is_fixed.dispatchEvent(new Event('change'));
});

clear_form_btn.addEventListener('click', (event) => {
    setFormPlaceholder();
    showUnfixedElements();
});

final_add_btn.addEventListener('click', (event) => {
    let form_data = JSON.stringify(get_data_from_form(), null, 2);
    console.log(form_data);
    tauriAPI.invoke('write_task_to_file', { jsonTask: form_data});
    setFormPlaceholder();
});

final_add_btn.addEventListener('keypress', (event) => {
    if(event.which === 13) final_add_btn.click();
})

document.getElementById('add-task-form').addEventListener('keypress', (event) => {
    if(event.which === 13) event.preventDefault();
});

document.getElementById('add-task-form').addEventListener('submit', (event) => {
    event.preventDefault();
});