export class Game {
    board: number[][];
    empty = 0;
    dimension = 4;
    score = 0;
    gameOver = false;
    winningTile = 2048;

    constructor() {
        // Init game
        this.reset();
    }

    // updates the game board with the given board
    useBoard(board: number[][]): Game {
        this.board = JSON.parse(JSON.stringify(board));
        return this;
    }

    // create a empty board of specified dimension
    fillBoard(dimension: number = this.dimension, value = this.empty): void {
        this.board = new Array(dimension);
        for (let i = 0; i < dimension; i++) {
            this.board[i] = new Array(dimension).fill(value);
        }
    }

    // Returns all available spaces in the board
    getAllFreeSpaces(): [number, number][] {
        let spaces: [number, number][] = [];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] === this.empty) {
                    spaces.push([i, j]);
                }
            }
        }

        return spaces;
      }
    
      // places a random tile on the board
      putRandomPiece(): void {
        let freeSpaces = this.getAllFreeSpaces();

        if (freeSpaces.length) {
            let move = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
            this.board[move[0]][move[1]] = Math.random() > 0.1 ? 2 : 4;
        }        
      }

      // resets the game
      reset(): void {
        // Reinit board
        this.fillBoard();

        // Add two blocks at random
        this.putRandomPiece();
        this.putRandomPiece();

        // clear score
        this.score = 0;
      }

      _moveLeftEach(row: number, col: number): void {
        if (row < 0 || col < 0 || row >= this.board.length || col >= this.board.length || this.board[row][col] !== this.empty) {
            return;
        }

        let anyMoreExist = false;
        for (let j = col; j < this.board.length - 1; j++) {
            this.board[row][j] = this.board[row][j + 1];
            anyMoreExist = anyMoreExist || this.board[row][j] !== this.empty;
        }
        this.board[row][this.board.length - 1] = this.empty;

        anyMoreExist && this._moveLeftEach(row, col);
      }

      _moveLeft(): void {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                this._moveLeftEach(i, j);
            }
        }
      }

      _combineLeft(): void {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length - 1; j++) {
                if (this.board[i][j] === this.board[i][j + 1]) {
                    this.board[i][j] *= 2;
                    this.board[i][j + 1] = 0;

                    this.score += this.board[i][j];
                }
            }
        }
      }

      // slides all pieces to the left
      // bot param is used to determine whether to put a random piece or not
      slideLeft(bot: boolean): void {
        let old = JSON.stringify(this.board);
        this._moveLeft();
        this._combineLeft();

        if (JSON.stringify(this.board) !== old) {
            this._moveLeft();
            !bot && this.putRandomPiece();
        }
      }

      _moveRightEach(row: number, col: number): void {
        if (row < 0 || col < 0 || row >= this.board.length || col >= this.board.length || this.board[row][col] !== this.empty) {
            return;
        }

        let anyMoreExist = false;
        for (let j = col; j > 0; j--) {
            this.board[row][j] = this.board[row][j - 1];
            anyMoreExist = anyMoreExist || this.board[row][j] !== this.empty;
        }
        this.board[row][0] = this.empty;

        anyMoreExist && this._moveRightEach(row, col);
      }

      _moveRight(): void {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = this.board.length - 1; j >= 0; j--) {
                this._moveRightEach(i, j);
            }
        }
      }

      _combineRight(): void {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = this.board.length - 1; j > 0; j--) {
                if (this.board[i][j] === this.board[i][j - 1]) {
                    this.board[i][j] *= 2;
                    this.board[i][j - 1] = 0;

                    this.score += this.board[i][j];
                }
            }
        }
      }

      // slides all pieces to the right
      // bot param is used to determine whether to put a random piece or not
      slideRight(bot: boolean): void {
        let old = JSON.stringify(this.board);
        this._moveRight();
        this._combineRight();

        if (JSON.stringify(this.board) !== old) {
            this._moveRight();
            !bot && this.putRandomPiece();
        }
      }

      _moveUpEach(row: number, col: number): void {
        if (row < 0 || col < 0 || row >= this.board.length || col >= this.board.length || this.board[row][col] !== this.empty) {
            return;
        }

        let anyMoreExist = false;
        for (let i = row; i < this.board.length - 1; i++) {
            this.board[i][col] = this.board[i + 1][col];
            anyMoreExist = anyMoreExist || this.board[i][col] !== this.empty;
        }
        this.board[this.board.length - 1][col] = this.empty;

        anyMoreExist && this._moveUpEach(row, col);
      }

      _moveUp(): void {
        for (let j = 0; j < this.board.length; j++) {
            for (let i = 0; i < this.board.length; i++) {
                this._moveUpEach(i, j);
            }
        }
      }

      _combineUp(): void {
        for (let j = 0; j < this.board.length; j++) {
            for (let i = 0; i < this.board.length - 1; i++) {
                if (this.board[i][j] === this.board[i + 1][j]) {
                    this.board[i][j] *= 2;
                    this.board[i + 1][j] = 0;

                    this.score += this.board[i][j];
                }
            }
        }
      }

       // slides up all pieces
      // bot param is used to determine whether to put a random piece or not
      slideUp(bot: boolean): void {
        let old = JSON.stringify(this.board);
        this._moveUp();
        this._combineUp();

        if (JSON.stringify(this.board) !== old) {
            this._moveUp();
            !bot && this.putRandomPiece();
        }
      }

      _moveDownEach(row: number, col: number): void {
        if (row < 0 || col < 0 || row >= this.board.length || col >= this.board.length || this.board[row][col] !== this.empty) {
            return;
        }

        let anyMoreExist = false;
        for (let i = row; i > 0; i--) {
            this.board[i][col] = this.board[i - 1][col];
            anyMoreExist = anyMoreExist || this.board[i][col] !== this.empty;
        }
        this.board[0][col] = this.empty;

        anyMoreExist && this._moveDownEach(row, col);
      }

      _moveDown(): void {
        for (let j = 0; j < this.board.length; j++) {
            for (let i = this.board.length - 1; i >= 0; i--) {
                this._moveDownEach(i, j);
            }
        }
      }

      _combineDown(): void {
        for (let j = 0; j < this.board.length; j++) {
            for (let i = this.board.length - 1; i > 0; i--) {
                if (this.board[i][j] === this.board[i - 1][j]) {
                    this.board[i][j] *= 2;
                    this.board[i - 1][j] = 0;

                    this.score += this.board[i][j];
                }
            }
        }
      }

       // slides down all pieces
      // bot param is used to determine whether to put a random piece or not
      slideDown(bot: boolean): void {
        let old = JSON.stringify(this.board);
        this._moveDown();
        this._combineDown();

        if (JSON.stringify(this.board) !== old) {
            this._moveDown();
            !bot && this.putRandomPiece();
        }
      }

      // returns true if the board has 2048 tile
      hasWon(): boolean {
          for (let i = 0; i < this.board.length; i++) {
              for (let j = 0; j < this.board.length; j++) {
                  if (this.board[i][j] === this.winningTile) {
                    return true;
                  }
              }
          }

          return false;
      }

      // returns true if there is no possible move left
      isGameOver(): boolean {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] === this.empty ||
                    (i > 0 && this.board[i][j] === this.board[i - 1][j]) || 
                    (i < this.board.length - 1 && this.board[i][j] === this.board[i + 1][j]) ||
                    (j > 0 && this.board[i][j] === this.board[i][j - 1]) || 
                    (j < this.board.length - 1 && this.board[i][j] === this.board[i][j + 1])) {
                    return false;
                }
            }
        }

        return true;
      }

      // 1  -> won
      // 0  -> going on
      // -1 -> lost
      getState(): number {
        if (this.hasWon()) {
            return 1;
        }

        if (this.isGameOver()) {
            return -1;
        }

        return 0;
      }
}