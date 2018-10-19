import { Game } from './game';
import { AppComponent } from './app.component';

export class Bot {
    app: AppComponent;
    active = false;
    botLoop: any;
    speed = 5;

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

    move(): void {
        switch (Math.floor(Math.random() * 4)) {
            case 1:
                this.app.slideLeft(null);
                break;
            case 2:
                this.app.slideRight(null);
                break;
            case 3:
                this.app.slideUp(null);
                break;
            case 4:
                this.app.slideDown(null);
                break;
        }
    }
}