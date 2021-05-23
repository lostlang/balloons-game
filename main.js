/*
    Additional 
*/


function get_random_int(max) {
    return Math.floor(Math.random() * max);
};


function get_start_balloon() {
    var x_b = game.offsetHeight - balloon_size[0];
    var y_b = get_random_int(game.offsetWidth - balloon_size[1]);
    return [x_b, y_b];
}


/*
    Game
*/


var balloon = "balloon";
var balloon_size = [60, 40];
var spawner = setInterval(function() {}, 20000);
var balloons_counter = 0;
var balloons_in_game = 0;
var balloons_inters = [];
var balloons_speed = 20;
var max_balloons = 10;
var time_to_spawn = 200;


function set_default() {
    balloons_counter = 0;
    balloons_in_game = 0;
    balloons_inters = [];
    balloons_speed = 20;
    max_balloons = 10;
    time_to_spawn = 200;
    score.textContent = 0;
}


function up_dificult() {
    time_to_spawn--;
    if (time_to_spawn % 10 == 0) {
        max_balloons++;
        balloons_speed--;
    };

}


start_button.onclick = function() {
    start_game();
};


function pop_balloon(event) {
    add_score(1);
    event.currentTarget.remove();
    clearInterval(balloons_inters[parseInt(event.currentTarget.id.split("n")[1])])
    balloons_in_game--;
    up_dificult();
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
    balloons_in_game++;

    var new_balloon_color = collor_pallet[get_random_int(collor_pallet.length)];
    new_balloon.classList.add(new_balloon_color);
    new_balloon.onclick = (event) => {pop_balloon(event);};
    
    var n_xy = get_start_balloon();
    new_balloon.style.top = n_xy[0] + "px";
    new_balloon.style.left = n_xy[1] + "px";
    
    game.appendChild(new_balloon);
    
    var b_inter = setInterval(function() {
        new_balloon.style.top = ((parseInt(new_balloon.style.top) || 1) - 1) + 'px';
        if (parseInt(new_balloon.style.top) == 0) {stop_game()}
    }, balloons_speed);
    balloons_inters.push(b_inter);
};


/*
    Game Loop
*/


function spawner_f() {
    clearInterval(spawner);
    if (balloons_in_game < max_balloons) {ballon_generator();};
    spawner = setInterval(spawner_f, time_to_spawn);
};


function start_game() {
    stop_game();
    set_default();
    clearInterval(spawner);
    spawner = setInterval(spawner_f, time_to_spawn);
};


function stop_game(id_inter) {
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    };
    balloons_inters.forEach(element => {
        clearInterval(element); 
    });
};
