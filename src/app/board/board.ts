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

    this.contestCell();
  }

  private contestCell() {
    const cellIdx = this.index.pop();

    if (cellIdx == null) return;

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
    const ids = this.cells.map((cell) => cell.id);
    const indexSize = SCORE_TO_WIN + SCORE_TO_WIN;
    const result = [];

    for (let i = 0; i < indexSize; i++) {
      const idx = Math.floor(Math.random() * ids.length);
      const id = ids[idx];

      result.push(id);
      ids.splice(idx, 1);
    }

    this.index = result;
  }
}
