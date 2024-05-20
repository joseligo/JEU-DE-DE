let currentScores = document.querySelectorAll(".currentScore"); //récupérer les scores courants dans un tableau
let scoresTotaux = document.querySelectorAll(".totalScore");

let roll = document.querySelector("#roll"); //pour lancer le dé
let hold = document.querySelector("#hold"); //pour finir son tour et récupérer les points
let lancer = document.getElementById("lancer"); //pour changer l'image du dé

reset();

function entierAleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function lancerDe() {
  nb = entierAleatoire(1, 6);
  lancer.innerHTML = `<i class="bi bi-dice-${nb} dice">`;
  if (nb == 1) {
    changePlayer();
  } else {
    currentScores[currentPlayer].innerHTML =
      parseInt(currentScores[currentPlayer].innerHTML) + nb;
  }
}

function finRound() {
  scoresTotaux[currentPlayer].innerHTML =
    parseInt(scoresTotaux[currentPlayer].innerHTML) +
    parseInt(currentScores[currentPlayer].innerHTML);
  if (parseInt(scoresTotaux[currentPlayer].innerHTML) >= 10) {
    playerWin();
  } else {
    changePlayer();
  }
}

function changePlayer() {
  currentScores[currentPlayer].innerHTML = 0;
  let activ = document.getElementById(`dot${currentPlayer}`);
  activ.classList.remove("active");
  currentPlayer == 1 ? (currentPlayer = 0) : (currentPlayer = 1);
  activ = document.getElementById(`dot${currentPlayer}`);
  activ.classList.add("active");
}

function playerWin() {
  currentScores[currentPlayer].innerHTML = 0;
  alert(`Le joueur ${currentPlayer + 1} a gagné`);
  roll.removeEventListener("click", lancerDe);
  hold.removeEventListener("click", finRound);
}

btnReset = document.querySelector('.reset');
btnReset.addEventListener('click', reset);

function reset() {
  currentScores.forEach(element => element.innerHTML = 0);
  scoresTotaux.forEach(element => element.innerHTML = 0);
  currentPlayer = 0;
  document.getElementById(`dot0`).classList.add("active");
  document.getElementById(`dot1`).classList.remove("active");
  roll.addEventListener("click", lancerDe);
  hold.addEventListener("click", finRound);
}