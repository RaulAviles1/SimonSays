var simonArr = [];
var playerArr = [];
var gameLength = 100;
var turn = 0;
var timeInt = 2000;
var timeIntBlink = 2500;
var computerTurn = true;
var x;
var y;
var simonLength = 2;
var playerTurn = 0;
var startPlayer = false;
var score = 1;
var audioULS = document.getElementById("audio-upper-left-side");
var audioURS = document.getElementById("audio-upper-right-side");
var audioLLS = document.getElementById("audio-lower-left-side");
var audioLRS = document.getElementById("audio-lower-right-side");
/*Initializing simon array*/
function setSimonArr(){
  for(var i = 0; i < 2; i++){
    simonArr[i] = Math.floor((Math.random() * 4));
  }
}

/*Starting simon turn*/
function simonTurn(){ 
  if(simonArr[turn] == 0){
    turn++;  
    setUpperLeftSide();
    playSound("ULS");
  }
    else if(simonArr[turn] == 1){
      turn++;
      setUpperRightSide();
      playSound("URS");
  }
    else if(simonArr[turn] == 2){
      turn++;
      setLowerLeftSide();
      playSound("LLS");
  }
    else if(simonArr[turn] == 3){
      turn++;
      setLowerRightSide();
      playSound("LRS");
  }
  if(turn == simonLength){
    clearTimeIntervals();
    if(startPlayer == false){
      playerState();
    }
    else{
      setTimeout(unSetSides, 300);
    }   
  }
}

/*Setting color for sides*/
function setUpperLeftSide(){
  $('#upper-left-side').css({
        'fill': '#4BC566'
  });
}
function setUpperRightSide(){
  $('#upper-right-side').css({
        'fill': '#FF6262'
  });
}
function setLowerLeftSide(){
  $('#lower-left-side').css({
        'fill': '#4367FC'
  });
}
function setLowerRightSide(){
  $('#lower-right-side').css({
        'fill': '#FFFB64'
  });
}

function playSound(x){
  if(x == "ULS"){
    audioULS.load();
    audioULS.play();
  }
  else if(x == "URS"){
    audioURS.load();
    audioURS.play();
  }
  else if(x == "LLS"){
    audioLLS.load();
    audioLLS.play();
  }
  else if(x == "LRS"){
    audioLRS.load();
    audioLRS.play();
  }
}

/*Unsetting color for all sides*/
function unSetSides(){
  $('#upper-left-side').css({
        'fill': '#09A42B'
    });
  $('#upper-right-side').css({
        'fill': '#FA0000'
    });
  $('#lower-left-side').css({
        'fill': '#0030FF'
    });
  $('#lower-right-side').css({
        'fill': '#FFF800'
  });
}

/*Initializing game*/
function startSimonTurn(){
  console.log("start computer turn");
   x = setInterval(simonTurn, 1000);
   y = setInterval(unSetSides, 1300);
}

/*Initializing player state*/
function playerState(){
  setTimeout(unSetSides, 300);
  console.log("start player trun");
  $('#upper-left-side').click(function(){
    playSound("ULS");
    playerArr.push(0);
    setUpperLeftSide();
    setTimeout(unSetSides, 300);
    checkLoser();
  });
  $('#upper-right-side').click(function(){
    playSound("URS");
    playerArr.push(1);
    setUpperRightSide();
    setTimeout(unSetSides, 300);
    checkLoser();
  });
  $('#lower-left-side').click(function(){
    playSound("LLS");
    playerArr.push(2);
    setLowerLeftSide();
    setTimeout(unSetSides, 300);
    checkLoser();
  });
  $('#lower-right-side').click(function(){
    playSound("LRS");
    playerArr.push(3);
    setLowerRightSide();
    setTimeout(unSetSides, 300);
    checkLoser();
  });
}

function checkArrays(){
  for(var i = 0; i < simonArr.length; i++){
    if(simonArr[i] !== playerArr[i]){
      return false;
    }
   }
    return true;
 }

/*Checking for loser*/
function checkLoser(){
  console.log("simon arr: " + simonArr);
  console.log("player arr: " + playerArr);
  playerTurn++;
  if(simonArr.length == playerArr.length){
    if(checkArrays()){
      simonLength++;
      var newElement = Math.floor((Math.random() * 4));
      simonArr.push(newElement);
      turn = 0;
      playerArr = [];
      startPlayer = true;
      document.getElementById("score").innerHTML = score.toString();
      score++;
      if(score == 20){
        alert("YOU WON!!!!");
      }
      startSimonTurn();
    }
  }
  for(var i = 0; i < playerArr.length; i++){
    if(simonArr[i] !== playerArr[i]){
      alert("you lost");
      resetGame();
      break;
    }
  }
}

/*Stopping time Intervals*/
function clearTimeIntervals(){
  clearInterval(x);
  clearInterval(y); 
}

function resetGame(){
  simonArr = [];
  playerArr = [];
  turn = 0;
  score = 0;
  document.getElementById("score").innerHTML = score.toString();
  startPlayer = "false";
  $('#Oval-3').css({
        'fill': 'red'
  });
  clearTimeIntervals();
}

$('#Oval-3').click(function(){
    $('#Oval-3').css({
        'fill': '#15FF00'
    }); 
      setSimonArr();
      startSimonTurn();
});