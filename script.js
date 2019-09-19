var board = document.getElementById('board'); // terrain
var token = document.getElementById('token'); // joueur
var ms = document.getElementById('ms'); // temps
var textFinish = document.getElementById('finish'); // texte finish
var textScore = document.getElementById('pts'); // texte score //ptsf
var textFScore = document.getElementById('ptsf'); // texte score fin
var trump; // food
var idTrump = 0;

var dir = 0; // direction
var distMove = 10; // Espacement entre 2 déplacements

var timeBoucle = 50; // Millisecondes entre 2 boucles
var limitTemps = 25; // Limitation de temps en secondes
var timeLeft = 0; // Temps restant
var score = 0; // Score
var timeFeed = 1; // Temps entre l'apparition de 2 points
var nextFeed = 0; // Temps avant la prochaine apparition de point
var finish = 0; // État de fin


// Boucle du jeu pour déplacer le DIV
function boucle() {
  idTrump++;
  if (timeLeft > 0) {
    timeLeft -= timeBoucle/1000;
    nextFeed -= timeBoucle/1000;
    ms.innerHTML = timeLeft.toFixed(2);
    switch(dir) {
      case 0:
        if (token.offsetLeft + token.offsetWidth < board.offsetWidth) token.style.left = (token.offsetLeft +distMove) + "px";
        break;
      case 1:
        if (token.offsetLeft > 0) token.style.left = (token.offsetLeft -distMove) + "px";
        break;
      case 2:
        if (token.offsetTop + token.offsetHeight < board.offsetWidth) token.style.top = (token.offsetTop +distMove) + "px";
        break;
      case 3:
        if (token.offsetTop > 0) token.style.top = (token.offsetTop -distMove) + "px";
        break;
    }

    // Animation du papa trumpp
    if (trump != null) idTrump < 5 ? trump.style.background = "url('img/trump f2.png')" : idTrump < 10 ? trump.style.background = "url('img/trump f1.png')" : idTrump = 0;

  } else if(finish == 0) {
    finish = 1;
    textFScore.innerHTML = score;
    textFinish.style.display = "block";
  }

  if (trump != null) {
    if (token.offsetLeft > trump.offsetLeft + trump.offsetWidth || token.offsetLeft < trump.offsetLeft - token.offsetWidth || token.offsetTop > trump.offsetTop + trump.offsetHeight || token.offsetTop < trump.offsetTop - token.offsetHeight)  {
  		// Pas toucher
  	} else {
      board.removeChild(trump);
      trump = null;
      score++;
      textScore.innerHTML = score;
  	}
  }

  if (nextFeed <= 0 && trump == null) {
    spawnFood(Rnd(board.offsetWidth - token.offsetWidth),Rnd(board.offsetHeight - token.offsetHeight));
    nextFeed = timeFeed;
  }
}

function Rnd(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function spawnFood(x,y) {
  trump = document.createElement("div");
  trump.id = "food";
  trump.style.left = x + "px";
  trump.style.top = y + "px";
  board.appendChild(trump);
}

document.addEventListener('keydown', function(event) {
  if (timeLeft > 0) {
    if(event.keyCode == 37) {
      dir = 1;
    } else if(event.keyCode == 38) {
      dir = 3;
    } else if(event.keyCode == 39) {
      dir = 0;
    } else if(event.keyCode == 40) {
      dir = 2;
    }
  }
})

function replay() {
  if (trump != null) {
    board.removeChild(trump);
    trump = null;
  }
  token.style.left = 0;
  token.style.top = 0;
  dir = 0;
  score = 0;
  timeLeft = limitTemps;
  finish = 0;
  nextFeed = 0;
  textFinish.style.display = "none";
}

function launch() {
  timeLeft = limitTemps;
  finish = 0;
  setInterval(boucle, timeBoucle);
}
