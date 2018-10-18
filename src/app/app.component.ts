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
    console.log(event);
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  slideDown(event: any) {
    console.log(event);
  }

  @HostListener('window:keydown.arrowleft', ['$event'])
  slideLeft(event: any) {
    console.log(event);
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  slideRight(event: any) {
    console.log(event);
  }



}
