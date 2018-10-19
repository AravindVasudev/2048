import { Component, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  game: Game;
  title = "2048!";

  constructor() {
    // Init Game
    this.game = new Game();
  }

  updateState() {
    let state = this.game.getState();
    console.log(state);

    if (state === 1) {
      this.title = "Won!";
    }

    if (state === -1) {
      this.title = "😞";
    }

    if (state === 0) {
      this.title = "2048!";
    }
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  slideUp(event: any) {
    this.game.slideUp();
    this.updateState();
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  slideDown(event: any) {
    this.game.slideDown();
    this.updateState();
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  slideLeft(event: any) {
    this.game.slideLeft();
    this.updateState();
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  slideRight(event: any) {
    this.game.slideRight();
    this.updateState();
  }
}
