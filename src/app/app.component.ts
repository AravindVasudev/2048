import { Component, HostListener } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  game: Game;

  constructor() {
    // Init Game
    this.game = new Game();
  }

  @HostListener('window:keydown.arrowup', ['$event'])
  slideUp(event: any) {
    this.game.slideUp();
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  slideDown(event: any) {
    this.game.slideDown();
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  slideLeft(event: any) {
    this.game.slideLeft();
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  slideRight(event: any) {
    this.game.slideRight();
  }
}
