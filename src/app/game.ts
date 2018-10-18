export class Game {
    board: number[][];
    empty = 0;
    dimension = 4;
    score = 0;

    constructor() {
        // Init game
        this.reset();
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

      reset(): void {
          // Reinit board
          this.fillBoard();

        // Add two blocks at random
        this.putRandomPiece();
        this.putRandomPiece();

          // clear score
          this.score = 0;
      }
}