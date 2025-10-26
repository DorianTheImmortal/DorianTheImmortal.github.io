// --- Find the Hidden Star Game --- //
// Simple game with 4+ JavaScript functions for Assignment 2

const state = {
  level: 1,
  score: 0,
  lives: 4,
  timeLeft: 10,
  timer: null,
  size: 3, // grid size
  starIndex: null,
};

// Formats seconds to MM:SS
function formatTime(sec) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Updates all on-screen values (HUD)
function renderHUD(msg = "") {
  document.getElementById("level").textContent = state.level;
  document.getElementById("score").textContent = state.score;
  document.getElementById("lives").textContent = state.lives;
  document.getElementById("time").textContent = formatTime(state.timeLeft);
  document.getElementById("message").textContent = msg;
}

// Builds the grid and hides a random star
function generateGrid() {
  const grid = document.getElementById("grid");
  const count = state.size * state.size;
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${state.size}, 60px)`;
  state.starIndex = Math.floor(Math.random() * count);

  for (let i = 0; i < count; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = i;
    tile.addEventListener("click", handleTileClick);
    grid.appendChild(tile);
  }
}

// Handles a click on a tile
function handleTileClick(e) {
  const i = Number(e.target.dataset.index);
  if (i === state.starIndex) {
    e.target.textContent = "⭐";
    state.score += 10;
    nextLevel();
  } else {
    e.target.textContent = "❌";
    e.target.style.pointerEvents = "none";
    state.lives--;
    if (state.lives <= 0) {
      gameOver("Out of lives!");
    } else {
      renderHUD("Try again!");
    }
  }
}

// Starts a level (with timer)
function startLevel() {
  clearInterval(state.timer);
  state.timeLeft = Math.max(6, 15 - state.level); // less time per level
  generateGrid();
  renderHUD(`Level ${state.level} — find the ⭐!`);
  startTimer();
}

// Countdown timer logic
function startTimer() {
  state.timer = setInterval(() => {
    state.timeLeft--;
    renderHUD();
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      state.lives--;
      if (state.lives <= 0) {
        gameOver("Time’s up!");
      } else {
        renderHUD("Time up! Lost a life.");
        nextLevel();
      }
    }
  }, 1000);
}

// Stops timer
function stopTimer() {
  clearInterval(state.timer);
}

// Move to next level
function nextLevel() {
  stopTimer();
  state.level++;
  startLevel();
}

// Ends the game
function gameOver(msg) {
  stopTimer();
  renderHUD(msg + " Game over!");
  document.getElementById("grid").innerHTML = "";
}

// Start button
function startGame() {
  state.level = 1;
  state.score = 0;
  state.lives = 4;
  renderHUD("Starting new game...");
  startLevel();
}

// Bind the Start button
document.getElementById("startBtn").addEventListener("click", startGame);

// Initialize HUD on page load
renderHUD("Click Start to begin!");
