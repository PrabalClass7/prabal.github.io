document.getElementById("Player").style.bottom = "-150px";
let score = 0;
function GameLoop(){
    var player = document.getElementById("Player");
    var player_position = 47.5;
    var container = document.getElementById("Objects-Div");
    function Generate(){
        score = score+1
        var objects = container.children;
        for (let i = 0; i<objects.length;i++){
            objects[i].remove()
        }
        let length
        if (score < 5) {
            length = 5
        }else{
            length = score;
        }
        for (var i = 0; i < length; i++) {
            container.innerHTML += `<img src="Pictures/Object-1.png" class="Object" style="left:${Math.floor(Math.random()*100)}vw">`;
        }
        
    }
    function Collision(){
        var objects = container.children;
        for (let i = 0; i<objects.length;i++){
            let top = parseInt(Math.floor((window.getComputedStyle(objects[i], null).getPropertyValue("bottom")).replace("px","")));
            let player_top = parseInt(Math.floor((player.style.bottom).replace("px","")));
            let left = parseInt(Math.floor((window.getComputedStyle(objects[i], null).getPropertyValue("left")).replace("px","")));
            let player_left = parseInt(Math.floor((window.getComputedStyle(player, null).getPropertyValue("left")).replace("px","")));
            if ((top-player_top) <= 2 && (top-player_top) >= -2){
                
                if ((left-player_left) <= 50 && (left-player_left) >= -50){
                    Lose();
                }
                
            }
        }
    }
    var generation = setInterval(Generate,5000);
    var collision = setInterval(Collision,10)
    var win = setInterval(function(){
        if (score>10){
            document.getElementById("Objects-Div").remove();
            clearInterval(generation);
            clearInterval(collision);
            Win();
            clearInterval(win);    
        }
    },10);
    
    document.onkeydown = function(e){
        
        if (player_position>1){
            if (e.key == "ArrowLeft"){
                Left();
            }
        }
        if (player_position<90){
            if (e.key == "ArrowRight"){
                Right();
            }
        }
    
    }
    
    function Left(){
        player.style.left = (player_position-1.5).toString()+"vw"
        player_position = player_position-1.5;
    }
    function Right(){
        player.style.left = (player_position+1).toString()+"vw"
        player_position = player_position+1.5;
    }
}
function StartGame(){
    document.getElementById("Player").style.animation = "Spaceship_rise 2s 1";
    document.getElementById("Player").style.bottom = "100px";
    document.getElementById("Start").style.visibility = "hidden";
    document.getElementById("Instruction").style.visibility="hidden"
    GameLoop();
}
function Lose(){
    document.getElementById("Background-Div").remove();
    document.getElementById("Score").innerHTML +=score;
}
function Win(){
    document.getElementById("Moon").style.visibility = "visible";
    document.getElementById("Moon").style.animation = "Moon_Appear 2s 1";
    document.getElementById("Moon").style.top = "40vh";
    document.getElementById("Player").style.animation = "Winner 2s 1";
    document.getElementById("Player").style.bottom = "58vh";
    document.getElementById("Player").style.left = "50vw";
    document.getElementById("Astronaut").style.visibility="visible"
    document.getElementById("Winning_Text").style.visibility="visible";
    
}
