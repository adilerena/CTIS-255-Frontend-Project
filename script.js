const countdown = document.getElementById("countdown")
const countdown_num = document.getElementById("countdown_num")
const game_sec = document.getElementById("game_section")

const timer = document.getElementById("timeRemaining")
const timeBar = document.getElementById("scoreBottom")
const time = Number(timer.textContent)
const hint = document.getElementById("hintMessage")
const gameGrid = document.getElementById("gameGrid")

const normalScore = document.getElementById("normalScore")
const hiScore = document.getElementById("hiScore")

setHiScore()

let hasGameStarted = false
let timerID = null
let period = 1000

let blackTiles = []
let tilesArray = []

function countdownFunc() {
    countdown_num.textContent = Number(countdown_num.textContent) - 1

    if (Number(countdown_num.textContent) === 0) {
        document.body.style.backgroundColor = "white"
        countdown.style.display = "none"

        drawSquares()
        console.log("done!")
    }
}

const mem_sec = document.getElementById("members_section")
    .addEventListener("click", function() {
        document.body.style.backgroundColor = "black"

        countdown.style.visibility = "visible"
        this.style.display = "none"

        if (timerID === null) {
            timerID = setInterval(countdownFunc, 1000)
        }
    })

function drawSquares() {
    let i = 0

    for (let r = 0; r < 4; r++) {
        let divRow = document.createElement("div")
        divRow.classList.add("gridRow")

        for (let c = 0; c < 4; c++) {

            let el = document.createElement("div")
            el.classList.add("square")

            divRow.appendChild(el)
            tilesArray.push(el)
            i++
        }
        
        gameGrid.appendChild(divRow)
    }

    while (blackTiles.length < 3) {
        let rand = 0

        do {
            rand = Math.floor(Math.random() * 16)
            console.log(rand)
        } while (blackTiles.includes(tilesArray[rand]))

        let el = tilesArray[rand]
        el.classList.add("selected")
        el.addEventListener("click", blackClick)

        blackTiles.push(el)
    }
}

let countdownTimer
let gameLogic

function blackClick() {
    if (!hasGameStarted) {
        hasGameStarted = true

        hint.style.display = "none"

        countdownTimer = setInterval(updateCountdown, 1000)

        gameLogic = setInterval(() => {
            update();
        }, 100)
    }
    this.removeEventListener("click", blackClick)
    this.classList.remove("selected")

    this.classList.add("hit")

    this.addEventListener("animationend", () => {
        this.classList.remove("hit")
    })

    let newArr = []

    for (let el of blackTiles)
        if (el !== this) {
            newArr.push(el)
        }

    blackTiles = newArr

    console.log("added score " + period / 100)

    const points = period / 100

    showScorePopup(this, points)

    normalScore.textContent = Number(normalScore.textContent) + points


    period = 1000
}

function updateCountdown() {

    timer.textContent = Number(timer.textContent) - 1

    if (Number(timer.textContent) === 0) {
        // stop the game!

        // timeBar.style.animate = "none"

        clearInterval(countdownTimer)
        clearInterval(gameLogic)
        document.getElementById("pressF5").classList.add("show")

        blackTiles.forEach(el => {
            el.removeEventListener("click", blackClick)
            el.classList.remove("selected")
        })
        updateHiScore()


    }

    timeBar.style.width = "0px"
}

function update() {

    if (blackTiles.length < 3) {
        let rand = 0

        do {
            rand = Math.floor(Math.random() * 16)
            console.log(rand)
        } while (blackTiles.includes(tilesArray[rand]))

        let el = tilesArray[rand]
        el.classList.add("selected")
        el.addEventListener("click", blackClick)

        blackTiles.push(el)

    }

    if (period > 0) {
        period -= 100
        let start = period + ":"
        let len = period / 1000 * 200
        timeBar.style.width = len + "px"
        start += period

        console.log(start)
    }
}


function setHiScore() {
    const highscore = localStorage.getItem("hiScore")
    if (highscore === null) {
        hiScore.textContent = "0"
    } else {
        hiScore.textContent = highscore
    }
}

function updateHiScore() {
    const finalScore = Number(normalScore.textContent)
    const currentHi = Number(hiScore.textContent)

    const overlay = document.getElementById("endTextSection");
    overlay.style.display = "block";

    if (finalScore > currentHi) {
        hiScore.textContent = String(finalScore)
        localStorage.setItem("hiScore", String(finalScore))
        newHiScoreAnimation()
    }
}

function showScorePopup(tileEl, points) {
    const pop = document.createElement("div")
    pop.classList.add("score-pop")
    pop.textContent = `+${points}`

    const tileRect = tileEl.getBoundingClientRect()
    const gridRect = gameGrid.getBoundingClientRect()

    const x = tileRect.left - gridRect.left + tileRect.width / 2
    const y = tileRect.top - gridRect.top + tileRect.height / 2

    pop.style.left = `${x}px`
    pop.style.top = `${y}px`

    gameGrid.appendChild(pop)

    pop.addEventListener("animationend", () => pop.remove())
}

function newHiScoreAnimation() {
    document.getElementById("endText").textContent = "New Hiscore"
    confetti();
}
