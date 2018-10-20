import { Game } from './game';
import { AppComponent } from './app.component';

export class Bot {
    app: AppComponent;
    active = false;
    botLoop: any;
    speed = 5;
    heuristicMatrix = [[7, 6, 5, 4],
                       [6, 5, 4, 3],
                       [5, 4, 3, 2],
                       [4, 3, 2, 1]];

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
            }
        }

        return score;
    }

    move(): void {
        // debugger;
        let newGames: Game[] = [];
        for (let i = 0; i < 4; i++) {
            newGames.push(new Game().useBoard(this.app.game.board));
        }

        newGames[0].slideLeft(true);
        newGames[1].slideRight(true);
        newGames[2].slideUp(true);
        newGames[3].slideDown(true);

        let maxScore = Number.MIN_SAFE_INTEGER;
        let maxMove: number;
        for (let i = 0; i < 4; i++) {
            let curFitness = this.computeFitness(newGames[i].board);
            if (maxScore < curFitness) {
                maxScore = curFitness;
                maxMove = i;
            }
        }

        switch (maxMove) {
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