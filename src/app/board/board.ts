import { Cell, createCell } from './cell';
import { createScore, Player, players } from './player';

const BOARD_SIZE = 10;
const SCORE_TO_WIN = 10;

export class Board {
  cells: Cell[] = [];
  contestedCellIdx: number | null = null;

  private index: number[] = [];
  private _score = createScore();

  get ended() {
    return (
      this.score.player === SCORE_TO_WIN || this.score.computer === SCORE_TO_WIN
    );
  }

  get winner(): Player | null {
    if (!this.ended) return null;

    return this.score.player === SCORE_TO_WIN
      ? players.Player
      : players.Computer;
  }

  get score() {
    return { ...this._score };
  }

  constructor(size: number = BOARD_SIZE) {
    this.createBoard(size);
    this.buildIndex();
  }

  start() {
    this.contestCell();
  }

  occupyCell(player: Player) {
    if (this.contestedCellIdx == null) return;

    const cell = this.cells[this.contestedCellIdx];
    cell.occupation = player;
    this._score[player]++;

    if (this.ended) {
      this.contestedCellIdx = null;
      return;
    }

    const idx = this.index.indexOf(this.contestedCellIdx);
    this.index.splice(idx, 1);
    this.contestCell();
  }

  private contestCell() {
    const idx = Math.floor(Math.random() * this.index.length);

    const cellIdx = this.index[idx];
    const cell = this.cells[cellIdx];

    if (cell != null) {
      this.contestedCellIdx = cellIdx;
    }
  }

  private createBoard(size: number) {
    let idx = 0;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        this.cells.push(createCell(row, col, idx++));
      }
    }
  }

  private buildIndex() {
    this.index = this.cells.map((cell) => cell.id);
  }
}
