let real_priority = document.getElementById('real-priority');

real_priority.addEventListener('input', (event) => {
    // Get the last character from input field
    let value = parseInt(real_priority.value.toString().charAt(
        real_priority.value.toString().length - 1));
    real_priority.value = value;

    if(value > 5) value = 5;
    if(value < 1) value = 1;

    add_star_highlight(value);
});

for(let i = 1; i <= 5; i++){
    let star = document.getElementById('star-' + i.toString());
    star.addEventListener('mouseenter', (event) =>{
        real_priority.value = i;
        add_star_highlight(i);
    });
}

function add_star_highlight(value){
    for(let i = 1; i <= 5; i++){
        let curr_star = document.getElementById('star-' + i.toString());
        if(i <= value){
            curr_star.classList.add('active');
        }else{
            curr_star.classList.remove('active');
        }
    }
}