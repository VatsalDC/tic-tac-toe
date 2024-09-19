let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; // playerO starts
let count = 0; // To Track Draw
let gameOver = false; // To track if the game is over

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach(box => box.style.backgroundColor = ""); // Reset box colors
};

const aiMove = () => {
    if (gameOver) return; // Prevent AI from moving after game is over
    let bestMove = findBestMove();
    if (bestMove !== null) {
        boxes[bestMove].innerText = "𒉽";
        boxes[bestMove].disabled = true;
        count++;
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
        turnO = true;
    }
};

const findBestMove = () => {
    // Check if AI can win
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText === "𒉽" && boxes[b].innerText === "𒉽" && boxes[c].innerText === "") return c;
        if (boxes[a].innerText === "𒉽" && boxes[c].innerText === "𒉽" && boxes[b].innerText === "") return b;
        if (boxes[b].innerText === "𒉽" && boxes[c].innerText === "𒉽" && boxes[a].innerText === "") return a;
    }
    // Check if AI needs to block player
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText === "𝓞" && boxes[b].innerText === "𝓞" && boxes[c].innerText === "") return c;
        if (boxes[a].innerText === "𝓞" && boxes[c].innerText === "𝓞" && boxes[b].innerText === "") return b;
        if (boxes[b].innerText === "𝓞" && boxes[c].innerText === "𝓞" && boxes[a].innerText === "") return a;
    }
    // Otherwise, pick a random available box
    let availableBoxes = Array.from(boxes).filter((box) => !box.disabled);
    if (availableBoxes.length > 0) {
        return Array.from(boxes).indexOf(availableBoxes[Math.floor(Math.random() * availableBoxes.length)]);
    }
    return null;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO && !gameOver) {
            box.innerText = "𝓞";
            turnO = false;
            box.disabled = true;
            count++;
            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            } else if (!turnO) {
                setTimeout(aiMove, 1000); // 1-second delay before AI moves
            }
        }
    });
});

function changetext() {
    document.getElementById("help").innerHTML = "You Shouldn't need instructions for This!";
}

function deftext() {
    document.getElementById("help").innerHTML = "?";
}

const gameDraw = () => {
    msg.innerText = `TIED! 
     This Game was a Draw!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#50ad94"; // Make winning boxes darker
    });
    disableBoxes();
    gameOver = true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return pos1Val;
            }
        }
    }
    return null;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
