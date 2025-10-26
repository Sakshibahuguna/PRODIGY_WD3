
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = Array(9).fill("");
let current = "X";
let gameOver = false;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function drawBoard() {
  boardEl.innerHTML = "";
  board.forEach((val, i) => {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.textContent = val;
    cell.disabled = val !== "" || gameOver;
    cell.addEventListener("click", () => handleMove(i));
    boardEl.appendChild(cell);
  });
}

function handleMove(index) {
  if (board[index] || gameOver) return;
  board[index] = current;
  checkGame();
  current = current === "X" ? "O" : "X";
  updateStatus();
  drawBoard();
}

function checkGame() {
  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      statusEl.textContent = `🎉 Player ${board[a]} wins!`;
      return;
    }
  }

  if (!board.includes("") && !gameOver) {
    gameOver = true;
    statusEl.textContent = "😐 It's a draw!";
  }
}

function updateStatus() {
  if (!gameOver) {
    statusEl.textContent = `Player ${current}'s turn`;
  }
}

function resetGame() {
  board = Array(9).fill("");
  current = "X";
  gameOver = false;
  statusEl.textContent = "Player X starts";
  drawBoard();
}

 
resetBtn.addEventListener("click", resetGame);

 
drawBoard();
