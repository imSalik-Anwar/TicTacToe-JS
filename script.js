document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById("board");
  const restartBtn = document.getElementById("restartBtn");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popupContent");
  const message = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");
  let currentPlayer = "X";
  let gameEnded = false;
  let boardState = ["", "", "", "", "", "", "", "", ""];

  // Function to check for a winner
  function checkWinner() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }

    if (!boardState.includes("")) {
      return "draw";
    }

    return null;
  }

  // Function to handle a square click
  function handleSquareClick(index) {
    if (!gameEnded && boardState[index] === "") {
      boardState[index] = currentPlayer;
      renderBoard();
      const winner = checkWinner();
      if (winner) {
        if (winner === "draw") {
          showMessage("It's a draw!");
        } else {
          showMessage(`${winner} wins!`);
        }
        gameEnded = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Function to restart the game
  function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameEnded = false;
    hidePopup();
    renderBoard();
  }

  // Function to render the game board
  function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = boardState[i];
      square.addEventListener("click", () => handleSquareClick(i));
      board.appendChild(square);
    }
  }

  // Function to show the popup with message
  function showMessage(msg) {
    message.textContent = msg;
    popup.style.display = "flex";
  }

  // Function to hide the popup
  function hidePopup() {
    popup.style.display = "none";
  }

  // Initial board render
  renderBoard();

  // Event listener for the restart button
  restartBtn.addEventListener("click", restartGame);

  // Event listener for the reset button inside the popup
  resetBtn.addEventListener("click", () => {
    hidePopup();
    restartGame();
  });
});

