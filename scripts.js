const cards = document.querySelectorAll('.card');
const modalGameOver = document.querySelector('.division__game');
const match = document.querySelector('.match')
let hasFlippedCard = false;
let firstCard, secondCard, cont = 0;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true; // se não tiver a primeira carta a mesma recebe o this(o elemento clicado);
        firstCard = this;
        return;
    }

    secondCard = this;  // caso contrário a segunda recebe o this;
    hasFlippedCard = false;
    checkForMath();
    getCont();
};

function checkForMath() {  // verificar se foi encontrado o par;
    if(firstCard.dataset.card === secondCard.dataset.card) {
        cont++
        addmatch()
        disableCards();
        return;
    }

    unflipCards();
};

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();   
    }, 1500);
};

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null, null];
};

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function gameOver() {
    setTimeout(() => {
        modalGameOver.classList.add('active');
        modalGameOver.addEventListener('click', startGame);
    }, 1500);    
};

function startGame() {
    modalGameOver.classList.remove('active');
    cards.forEach((card) => {
        card.classList.remove('flip');
   });
   location.reload();
};

function getCont(){
    if(cont === 6) {
        gameOver();
        return;
    };
};

function addmatch() {
    match.classList.add('addMatch')
    setTimeout(()=> {
        match.classList.remove('addMatch')
    }, 1500);
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

