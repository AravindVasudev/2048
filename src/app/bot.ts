import { Game } from './game';
import { AppComponent } from './app.component';

export class Bot {
    app: AppComponent;
    active = false;
    botLoop: any;
    speed = 0;
    depth = 5;
    botPlayer = 0;
    boardPlayer = 1;
    heuristicMatrix = [[7, 6, 5, 4],
                       [6, 5, 4, 2],
                       [5, 4, 3, 2],
                       [4, 3, 2, 1]];

    constructor(app: AppComponent) {
        this.app = app;
    }

    // toggles the bot
    play(): void {
        if (this.active) {
            this.active = false;
            clearInterval(this.botLoop);
        } else {
            this.active = true;
            this.botLoop = setInterval(() => this.move(), this.speed);
        }
    }

    // computes fitness for a given board
    // uses top-left corner as heuristics and adds extra points for freespace
    computeFitness(board: number[][]) {
        let score = 0;
        let freeSpace = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                score += board[i][j] * this.heuristicMatrix[i][j];
                if (board[i][j] === this.app.game.empty) {
                    freeSpace++;
                }
            }
        }

        return score + freeSpace;
    }

    // compares two given boards
    areBoardsEqual(board1: number[][], board2: number[][]): boolean {
        return JSON.stringify(board1) === JSON.stringify(board2);
    }

    // returns [score, direction]
    // 0 -> left
    // 1 -> right
    // 2 -> up
    // 3 -> down
    expectimax(game: Game, prevGame: Game = null, dir: number = -1, player = this.botPlayer, depth = this.depth): [number, number] {
        if (depth <= 0) { // if depth limit reached
            return [this.computeFitness(game.board), dir];
        }

        // if no moves left in current direction
        if (game.isGameOver() || (prevGame !== null && this.areBoardsEqual(game.board, prevGame.board))) {
            return [-9999 / depth, dir];
        }

        // if 2048 is formed
        if (game.hasWon()) {
            return [10000 / depth, dir];
        }

        if (player === this.boardPlayer) { // Chance player a.k.a the board
            let score = 0;
            let numEmpty = 0;

            for (let i = 0; i < game.board.length; i++) {
                for (let j = 0; j < game.board.length; j++) {
                    if (game.board[i][j] === game.empty) {
                        let newGame = new Game().useBoard(game.board);

                        newGame.board[i][j] = 2;
                        score += 0.9 * this.expectimax(newGame, game, dir, this.botPlayer, depth - 1)[0];

                        newGame.board[i][j] = 4;
                        score += 0.1 * this.expectimax(newGame, game, dir, this.botPlayer, depth - 1)[0];

                        numEmpty++;
                    }
                }
            }

            return [score / numEmpty, dir];
        } else { // max player a.k.a the bot
            let newGames: Game[] = [];
            for (let i = 0; i < 4; i++) {
                newGames.push(new Game().useBoard(game.board));
            }

            newGames[0].slideLeft(true);
            newGames[1].slideRight(true);
            newGames[2].slideUp(true);
            newGames[3].slideDown(true);

            let maxMove: [number, number] = [Number.MIN_SAFE_INTEGER, -1];
            for (let i = 0; i < 4; i++) {
                let curMove = this.expectimax(newGames[i], game, i, this.boardPlayer, depth - 1);
                if (maxMove[0] < curMove[0]) {
                    maxMove = curMove;
                }
            }

            return maxMove;
        }
    }

    // computes the next move and makes it
    move(): void {
        let maxMove = this.expectimax(this.app.game);

        switch (maxMove[1]) {
            case 0:
                this.app.slideLeft(null);
                break;
            case 1:
                this.app.slideRight(null);
                break;
            case 2:
                this.app.slideUp(null);
                break;
            case 3:
                this.app.slideDown(null);
                break;
        }
    }
}