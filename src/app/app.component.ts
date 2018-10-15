import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  board: number[][];
  empty = 0;

  constructor() {
    // Init board
    this.fillBoard(4);
  }

  // create a empty board of specified dimension
  fillBoard(dimension: number, value = this.empty): void {
    this.board = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
      this.board[i] = new Array(dimension).fill(value);
    }
  }
}
