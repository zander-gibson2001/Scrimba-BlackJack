let player = {
    name: "Frodo",
    chips: 20
}
let bust = false
let inProgress = false
let hasBet = false
let bet = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": £" + player.chips

function inputBet(input) {
    // Only allow the player to bet if there isn't a game in progress
    if (inProgress === false && bust === false){
        betEntry = document.getElementById("bet").value
        // Enter the bet if it is non-zero.
        if (betEntry != 0 && betEntry > 0){
            bet = betEntry
            console.log(bet)
            hasBet = true
        }
    }
}

function limiter(input){
    if (input.value <= 0){
        input.value = 1
    } else if (input.value > player.chips){
        input.value = player.chips
    }
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function newGame() {
    // Only allow the player to start the game if they have made a bet
    if (hasBet === true){
        hasBlackJack = false
        inProgress = true
        isAlive = true
        // Reset the card deck
        cards = []
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.chips += bet * 2 // Double their bet if they win
        hasBlackJack = true
        inProgress = false
        playerEl.textContent = player.name + ": £" + player.chips
    } else {
        message = "You're out of the game!"
        player.chips -= bet // Take away their bet if they lose
        if (player.chips === 0){
            bust = true
            message = "You're out of chips!"
        }
        isAlive = false
        inProgress = false
        playerEl.textContent = player.name + ": £" + player.chips
    }
    messageEl.textContent = message
    hasBet = false
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
