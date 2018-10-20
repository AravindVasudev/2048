import { Game } from './game';
import { AppComponent } from './app.component';

export class Bot {
    app: AppComponent;
    active = false;
    botLoop: any;
    speed = 5;
    depth = 5;
    botPlayer = 0;
    boardPlayer = 1;
    heuristicMatrix = [[10, 8, 7, 6],
                       [8, 7, 6, 5],
                       [7, 6, 5, 4],
                       [6, 5, 4, 2]];

    constructor(app: AppComponent) {
        this.app = app;
    }

    play(): void {
        if (this.active) {
            this.active = false;
            clearInterval(this.botLoop);
        } else {
            this.active = true;
            this.botLoop = setInterval(() => this.move(), this.speed);
        }
    }

    computeFitness(board: number[][]) {
        let score = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                score += board[i][j] * this.heuristicMatrix[i][j];
                if (board[i][j] === this.app.game.empty) {
                    score += 10;
                }
            }
        }

        return score;
    }

    areBoardsEqual(board1: number[][], board2: number[][]): boolean {
        return JSON.stringify(board1) === JSON.stringify(board2);
    }

    // returns [score, direction]
    // 0 -> left
    // 1 -> right
    // 2 -> up
    // 3 -> down
    expectimax(game: Game, prevGame: Game = null, dir: number = -1, player = this.botPlayer, depth = this.depth): [number, number] {
        if (depth <= 0) {
            return [this.computeFitness(game.board), dir];
        }

        if (game.isGameOver() || (prevGame !== null && this.areBoardsEqual(game.board, prevGame.board))) {
            return [-9999 / depth, dir];
        }

        if (player === this.boardPlayer) {
            let score = 0;
            let numEmpty = 0;

            for (let i = 0; i < game.board.length; i++) {
                for (let j = 0; j < game.board.length; j++) {
                    if (game.board[i][j] === game.empty) {
                        let newGame = new Game().useBoard(this.app.game.board);

                        newGame.board[i][j] = 2;
                        score += 0.9 * this.expectimax(newGame, game, dir, this.botPlayer, depth - 1)[0];

                        newGame.board[i][j] = 4;
                        score += 0.1 * this.expectimax(newGame, game, dir, this.botPlayer, depth - 1)[0];

                        numEmpty++;
                    }
                }
            }

            return [score / numEmpty, dir];
        } else {
            let newGames: Game[] = [];
            for (let i = 0; i < 4; i++) {
                newGames.push(new Game().useBoard(this.app.game.board));
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

    move(): void {
        // debugger;
        let maxMove = this.expectimax(this.app.game);

        console.log(maxMove);

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