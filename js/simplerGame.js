function startGame(button){
    resetValues();
    button.disabled = true;
    countdown = "60";
    button.value = countdown;
    generateBall(button);
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
function generateBall(button){
    var parent = document.getElementById("wrapper");  
    increaseCounterByOne("generatedBalls");
    var ballId = Math.random().toString(16).substr(2, 8);
    //<input type="button" class="ball" onclick="pop(this)" id="${ballId}"/>
    var ball = document.createElement('input');
    ball.type="button";
    ball.setAttribute("class","ball");
    ball.setAttribute("onclick","pop(this.id, true)");
    ball.style.width = "78px";
    ball.style.height = "78px";
    ball.id = ballId;
    parent.insertAdjacentElement("beforeend",ball);
    changeSize(ballId);        
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
}
function pop(ballId, didItScore){
    if (didItScore == true)
        increaseCounterByOne("score");
    generateBall();
    document.getElementById(ballId).remove();
}

function changeSize(ballId){
    var button = document.getElementById("start");  
    ball = document.getElementById(ballId);
    var numberOfChanges = 0;
    var sizeInterval = setInterval(function(){
        if (ball != null){
            console.log(ball.style.width);
            if (ball.style.width == "20px" || ball.style.width == "80px"){
                numberOfChanges += 1;
                console.log("La bola "+ballId+ " ha cambiado " + numberOfChanges);
            }
            if (numberOfChanges == 3 || button.value == "0"){
                console.log("La bola "+ballId+ " ha explotado ");
                pop(ballId, false);
                clearInterval(sizeInterval);
            }
            else if (numberOfChanges == 0 || numberOfChanges == 2){
                decreaseSize(ballId);
            }
            else if (numberOfChanges == 1){
                increaseSize(ballId);
            }
        }
        else{
            clearInterval(sizeInterval);
        }
    },50);
}

function increaseSize(ballId){
    if (document.getElementById(ballId) != null){
        ball = document.getElementById(ballId);
        var sizeOfBall = ball.style.width;
        indexOfP = sizeOfBall.indexOf('p');
        var sizeNumber = parseInt(sizeOfBall.substring(0,indexOfP))+2;
        sizeOfBall = sizeNumber + "px";
        ball.style.width = sizeOfBall;
        ball.style.height = sizeOfBall;
    }

}

function decreaseSize(ballId){
    if (document.getElementById(ballId) != null){
        ball = document.getElementById(ballId);
        var sizeOfBall = ball.style.width;
        indexOfP = sizeOfBall.indexOf('p');
        var sizeNumber = parseInt(sizeOfBall.substring(0,indexOfP))-2;
        sizeOfBall = sizeNumber + "px";
        ball.style.width = sizeOfBall;
        ball.style.height = sizeOfBall;
    }
}