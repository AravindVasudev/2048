import { Game } from './game';

export class Bot {
    game: Game;
    active = false;
    botLoop: any;
    speed = 5;

    constructor(game: Game) {
        this.game = game;
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

    move(): void {
        switch (Math.floor(Math.random() * 4)) {
            case 1:
                this.game.slideLeft();
                break;
            case 2:
                this.game.slideRight();
                break;
            case 3:
                this.game.slideUp();
                break;
            case 4:
                this.game.slideDown();
                break;
        }
    }
}