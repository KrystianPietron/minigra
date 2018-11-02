function game() {
  this.initialBoardArr = (
    Array(20).fill(1).map(el => (Array(20).fill(1).map(el => Math.round(Math.random()*1,5))))
  );
  this.boardArr = null;
  this.playerPosition = {
    x: 0,
    y: 1
  };
  this.init();
}
game.prototype.init = function() {
  this.startListeningArrows();
  this.render();
};
game.prototype.render = function() {
  document.body.innerHTML = "";

  this.composeBoard();

  this.boardArr.forEach((row, i) => {
    const rowDiv = document.createElement("div");
    rowDiv.style.height = "50px";
    row.forEach((cell, j) => {
      this.renderSingleCell(cell, rowDiv);
    });
    document.body.appendChild(rowDiv);
  });
};

game.prototype.renderSingleCell = function(cell, rowDiv) {
  const cellDiv = document.createElement("div");

  cellDiv.style.display = "inline-block";
  cellDiv.style.width = "50px";
  cellDiv.style.height = "50px";

  if (cell === 0) cellDiv.style.backgroundColor = "black";
  if (cell === 1) cellDiv.style.backgroundColor = "gray";
  if (cell === "P") cellDiv.style.backgroundColor = "red";

  rowDiv.appendChild(cellDiv);
};
game.prototype.composeBoard = function() {
  this.boardArr = JSON.parse(JSON.stringify(this.initialBoardArr));
  this.boardArr[this.playerPosition.y][this.playerPosition.x] = "P";
};

game.prototype.startListeningArrows = function() {
  window.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        this.checkIfMoveIsAvaible(0, -1);
        console.log(event.key);
        break
      case "ArrowDown":
        event.preventDefault();
        this.checkIfMoveIsAvaible(0, 1);
        console.log(event.key);
        break
      case "ArrowLeft":
        event.preventDefault();
        this.checkIfMoveIsAvaible(-1, 0);
        console.log(event.key);
        break
      case "ArrowRight":
        event.preventDefault();
        this.checkIfMoveIsAvaible(1, 0);
        console.log(event.key);
        break
    }
  });
};
game.prototype.checkIfMoveIsAvaible = function(deltaX, deltaY) {
  const newPlayerPosition = {
    x: this.playerPosition.x + deltaX,
    y: this.playerPosition.y + deltaY
  };
  if (
    this.boardArr[newPlayerPosition.y] &&
    this.boardArr[newPlayerPosition.y][newPlayerPosition.x]
  ) {
    this.move(newPlayerPosition);
  }
};
game.prototype.move = function(newPlayerPosition) {
  this.playerPosition = newPlayerPosition;

  this.render();
};
