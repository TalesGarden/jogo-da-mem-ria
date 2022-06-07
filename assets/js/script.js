const cards = document.querySelectorAll('.card');
const playAgain = document.getElementById('playAgain');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let numberOfAttempts = 10;


//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        playSound();
        disableCards();
        return;
    }

    if (numberOfAttempts == 0) {
        //unflipCards();
        clearBoard();
    }

    console.log(numberOfAttempts);
    numberOfAttempts--;
    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

//adiciona evento de jogar novamente
playAgain.addEventListener('click',reloadPage);

function reloadPage()
{
    location.reload();

}

function clearBoard(){
    resetBoard();
    cards.forEach((card) => {
        card.removeEventListener('click', flipCard)
    });
}

function playSound() {
    var audio = new Audio(
'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
    audio.play();
}

