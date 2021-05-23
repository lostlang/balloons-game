
/*
    Additional 
*/

function get_random_int(max) {
    return Math.floor(Math.random() * max);
}


/*
    Game
*/

var balloons_counter = 0;
var balloon = "balloon";
var ballons_in_game = 0;
var spawner = setInterval(function() {}, 20000);
var max_balloons = 10;
var time_to_spawn = 200;


start_button.onclick = function() {
    start_game();
}


function pop_balloon(event) {
    add_score(1);
    event.currentTarget.remove();
    ballons_in_game--;
    time_to_spawn--;
};


function add_score(value){
    score.textContent = parseInt(score.textContent) + value;
};


function ballon_generator(){
    var collor_pallet = [
        "red",
        "blue",
        "green",
        "yellow",
        "magenta"
    ];
    
    var new_balloon = document.createElement("div");
    new_balloon.classList.add(balloon);
    var new_balloon_id = balloon + balloons_counter;
    new_balloon.id = new_balloon_id;
    balloons_counter++;
    ballons_in_game++;

    var new_balloon_color = collor_pallet[get_random_int(collor_pallet.length)];
    new_balloon.classList.add(new_balloon_color);
    new_balloon.onclick = (event) => {pop_balloon(event)};
    game.appendChild(new_balloon)
};


/*
    Game Loop
*/


function spawner_f() {
    clearInterval(spawner);
    if (ballons_in_game < max_balloons) {ballon_generator();};
    spawner = setInterval(spawner_f, time_to_spawn);
}


function start_game() {

    score.textContent = 0;
    balloons_counter = 0;

    clearInterval(spawner);

    spawner = setInterval(spawner_f, time_to_spawn);
}