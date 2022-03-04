async function startGame(button){
    resetValues();
    button.disabled = true;
    countdown = "10";
    button.value = countdown;
    generateBalls(button);
    var gameInterval = setInterval(function(){
        if (button.value == 0){
            var score = document.getElementById("score").getAttribute("value");
            var generatedBalls = document.getElementById("generatedBalls").getAttribute("value");
            var accuracy = Math.round(score/document.getElementById("totalClicks").getAttribute("value")*10000)/100;
            button.disabled = false;
            button.value = "Start game!";
            alert("You hit " + score + "/" + generatedBalls + " balls, with an accuracy of: " + accuracy + "%")
            removeLeftoverBalls();
            clearInterval(gameInterval);
        }
        else{
            button.value--;
        }
    },1000);
}
async function generateBalls(button){
    var parent = document.getElementById("wrapper");
    var gameInterval = setInterval(function(){
        if (button.value == "Start game!" || button.value == "0"){
            clearInterval(gameInterval);
        } else{
            increaseCounterByOne("generatedBalls");
            var ballId = Math.random().toString(16).substr(2, 8);
            //<input type="button" class="ball" onclick="pop(this)" id="${ballId}"/>
            var ball = document.createElement('input');
            ball.type="button";
            ball.setAttribute("class","ball");
            ball.setAttribute("onclick","pop(this)");
            ball.id = ballId;
            console.log(ball);
            parent.insertAdjacentElement("beforeend",ball);
            //changeSize(ball);
        }
    },2000+Math.random()*1000);
    
}
function removeLeftoverBalls(){
    var parent = document.getElementsByClassName("ball");
    while (parent[0]){
        parent[0].parentNode.removeChild(parent[0]);
    }
}

function resetValues(){
    document.getElementById("score").setAttribute("value", "0");
    document.getElementById("generatedBalls").setAttribute("value", "0");
    document.getElementById("totalClicks").setAttribute("value", "-1");

}
function increaseCounterByOne(id){
    let counter = document.getElementById(id);
    let value = parseInt(counter.getAttribute("value"));
    value++;
    document.getElementById(id).setAttribute("value", value);
    counter.value = value;
}
function hitOrMiss(){
    increaseCounterByOne("totalClicks");
    console.log(document.getElementById("totalClicks").getAttribute("value"));
}
function pop(ball){
    increaseCounterByOne("score");
    ball.remove();
}

async function changeSize(ball){
    var sizeInterval = setInterval(function(){
        ball.style.width++;
        ball.style.height++;
    },200);
}