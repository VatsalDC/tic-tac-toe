let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

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


boxes.forEach((box) => {
	box.addEventListener("click", () => {
		if (turnO) {
			//playerO
			box.innerText = "𝓞";
			turnO = false;
		} else {
			//playerX
			box.innerText = "𒉽";
			turnO = true;
		}
		box.disabled = true;
		count++;

		let isWinner = checkWinner();

		if (count === 9 && !isWinner) {
			gameDraw();
		}
	});
});
// for the help button
function changetext() {
	document.getElementById("help").innerHTML =
		"You Shouldn't need instructions for This!";
}
function deftext() {
	document.getElementById("help").innerHTML = "?";
}

const gameDraw = () => {
	msg.innerText = `TIED! 
	 This Game was a Draw!!`;
	msgContainer.classList.remove("hide");
	disableBoxes();
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
