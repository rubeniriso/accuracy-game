function startGame(button) {
  randomizePosition();
  resetValues();
  button.disabled = true;
  countdown = "60";
  button.value = countdown;
  generateBalls(button);
  var gameInterval = setInterval(function () {
    if (button.value == 0) {
      var score = document.getElementById("score").getAttribute("value");
      var generatedBalls = document
        .getElementById("generatedBalls")
        .getAttribute("value");
      var accuracy =
        Math.round(
          (score /
            document.getElementById("totalClicks").getAttribute("value")) *
            10000
        ) / 100;
      button.disabled = false;
      button.value = "Start game!";
      alert(
        "You hit " +
          score +
          "/" +
          generatedBalls +
          " balls, with an accuracy of: " +
          accuracy +
          "%"
      );
      removeLeftoverBalls();
      clearInterval(gameInterval);
    } else {
      button.value--;
    }
  }, 1000);
}
function randomizePosition(width, height, difference) {
  xPosition = Math.round(Math.random() * width);
  yPosition = Math.round(Math.random() * (height - difference) + difference);
  return [xPosition, yPosition];
}
function generateBalls(button) {
  parent = document.getElementById("wrapper");
  parentWidth = parent.getBoundingClientRect().width;
  parentHeight = parent.getBoundingClientRect().height;
  bottom = parent.getBoundingClientRect().bottom;
  difference = Math.round(bottom - parentHeight);
  var gameInterval = setInterval(function () {
    if (button.value < "10") {
      clearInterval(gameInterval);
    } else {
      increaseCounterByOne("generatedBalls");
      var ballId = Math.random().toString(16).substr(2, 8);
      var ball = document.createElement("input");
      ball.type = "button";
      ball.setAttribute("class", "ball");
      ball.setAttribute("onclick", "pop(this.id, true)");
      const maxSize = Math.round(50 + Math.random() * 50);
      const minSize = 20;
      ball.style.width = maxSize - minSize + "px";
      ball.style.height = maxSize - minSize + "px";
      ball.id = ballId;
      positions = randomizePosition(parentWidth, parentHeight, difference);
      ball.style.left = positions[0];
      ball.style.top = positions[1];
      parent.insertAdjacentElement("beforeend", ball);
      changeSize(ballId, button, maxSize, minSize);
      //changePosition(ballId, button, parentHeight, parentWidth, difference)
    }
  }, 700 + Math.random() * 100);
}
function removeLeftoverBalls() {
  var parent = document.getElementsByClassName("ball");
  while (parent[0]) {
    parent[0].parentNode.removeChild(parent[0]);
  }
}
/*function changePosition(ballId, button, parentHeight, parentWidth, difference){
    const interval = 10;
    const xCoord = document.getElementById(ballId).style.left;
    const yCoord = document.getElementById(ballId).style.top;
    var numberOfChanges = 0;
    var sizeInterval = setInterval(function(){
        if (document.getElementById(ballId) != null){
            if (Math.abs(document.getElementById(ballId).style.left - xCoord) > 100 ){
                numberOfChanges += 1;
            }
            if (numberOfChanges == 9 || button.value == "0"){
                pop(ballId, false);
                clearInterval(sizeInterval);
            }
            else if (numberOfChanges %2 ==0){
                moveLeft(ballId);
            }
            else if (numberOfChanges%2 != 0){
                moveRight(ballId);
            }
        }
        else{
            clearInterval(sizeInterval);
        }
    },interval);
    function moveLeft(ballId){
        var xCoord = document.getElementById(ballId).style.width;
        indexOfP = xCoord.indexOf('p');
        var xCoordNumber = parseInt(xCoord.substring(0,indexOfP))-1;
        xCoord = xCoordNumber + "px";
        document.getElementById(ballId).style.left=xCoord;
    }
    function moveRight(ballId){
        var xCoord = document.getElementById(ballId).style.width;
        indexOfP = xCoord.indexOf('p');
        var xCoordNumber = parseInt(xCoord.substring(0,indexOfP))+1;
        xCoord = xCoordNumber + "px";
        document.getElementById(ballId).style.left=xCoord;
    }
}*/

function resetValues() {
  document.getElementById("score").setAttribute("value", "0");
  document.getElementById("score").innerHTML = "0";
  document.getElementById("generatedBalls").setAttribute("value", "0");
  document.getElementById("generatedBalls").innerHTML = "0";
  document.getElementById("totalClicks").setAttribute("value", "0");
  document.getElementById("totalClicks").innerHTML = "0";
}

function increaseCounterByOne(id) {
  let counter = document.getElementById(id);
  let value = parseInt(counter.getAttribute("value"));
  value++;
  document.getElementById(id).setAttribute("value", value);
  counter.value = value;
  counter.innerHTML = counter.value;
}
function hitOrMiss() {
  increaseCounterByOne("totalClicks");
}
function pop(ballId, didItScore) {
  if (document.getElementById(ballId) != null) {
    if (didItScore) increaseCounterByOne("score");
    document.getElementById(ballId).remove();
  }
}

function changeSize(ballId, button, maxSize, minSize) {
  const maxSizePixels = maxSize + "px";
  const minSizePixels = minSize + "px";
  const interval = 25 + Math.random() * 80;
  var numberOfChanges = 0;
  var sizeInterval = setInterval(function () {
    if (document.getElementById(ballId) != null) {
      if (
        document.getElementById(ballId).style.width < minSizePixels ||
        document.getElementById(ballId).style.width > maxSizePixels
      ) {
        numberOfChanges += 1;
      }
      if (numberOfChanges == 9 || button.value == "0") {
        pop(ballId, false);
        clearInterval(sizeInterval);
      } else if (numberOfChanges % 2 == 0) {
        decreaseSize(ballId);
      } else if (numberOfChanges % 2 != 0) {
        increaseSize(ballId);
      }
    } else {
      clearInterval(sizeInterval);
    }
  }, interval);
}

function increaseSize(ballId) {
  if (document.getElementById(ballId) != null) {
    var sizeOfBall = document.getElementById(ballId).style.width;
    indexOfP = sizeOfBall.indexOf("p");
    var sizeNumber = parseInt(sizeOfBall.substring(0, indexOfP)) + 1;
    sizeOfBall = sizeNumber + "px";
    document.getElementById(ballId).style.width = sizeOfBall;
    document.getElementById(ballId).style.height = sizeOfBall;
  }
}

function decreaseSize(ballId) {
  if (document.getElementById(ballId) != null) {
    var sizeOfBall = document.getElementById(ballId).style.width;
    indexOfP = sizeOfBall.indexOf("p");
    var sizeNumber = parseInt(sizeOfBall.substring(0, indexOfP)) - 1;
    sizeOfBall = sizeNumber + "px";
    document.getElementById(ballId).style.width = sizeOfBall;
    document.getElementById(ballId).style.height = sizeOfBall;
  }
}
