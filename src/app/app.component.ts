import { Component, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import { Game } from './game';
import { Bot } from './bot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  game: Game;
  bot: Bot;
  title = "2048!";

  constructor() {
    // Init Game
    this.game = new Game();

    // Init Bot
    this.bot = new Bot(this);
  }

  // Updates the game state to title
  updateState() {
    let state = this.game.getState();

    if (state === 1) {
      this.title = "Won!";
    }

    if (state === -1) {
      this.title = "😞";
    }

    if (state === 0) {
      this.title = "2048!";
    }

    return state;
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  slideUp(event: any) {
    if (this.updateState() === 0) {
      this.game.slideUp(false);
    }
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  slideDown(event: any) {
    if (this.updateState() === 0) {
      this.game.slideDown(false);
    }
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  slideLeft(event: any) {
    if (this.updateState() === 0) {
      this.game.slideLeft(false);
    }
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  slideRight(event: any) {
    if (this.updateState() === 0) {
      this.game.slideRight(false);
    }
  }
}
