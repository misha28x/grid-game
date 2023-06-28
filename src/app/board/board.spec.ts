import { Board } from './board';
import { Player, players } from 'board/player';

describe('Board', () => {
  it('should create an instance', () => {
    expect(new Board()).toBeTruthy();
  });

  it('should create board with correct size', () => {
    const board = new Board(10);
    expect(board.cells.length).toBe(100);
  });

  it('should choose cell to contest', () => {
    const board = new Board();

    expect(board.contestedCellIdx).not.toBeNull();
  });

  it('should correctly occupy cell', () => {
    const board = new Board();

    const contestedCell = board.cells.find(
      (cell) => cell.id === board.contestedCellIdx
    );
    board.occupyCell(players.Player);

    expect(contestedCell?.occupation).toBe(players.Player);
  });

  it('should correctly count score', () => {
    const board = new Board();

    board.occupyCell(players.Player);
    board.occupyCell(players.Player);
    board.occupyCell(players.Computer);

    expect(board.score.player).toBe(2);
    expect(board.score.computer).toBe(1);
  });

  it('should detect game end', () => {
    const board = new Board();

    playGame(board, players.Player);

    expect(board.ended).toBeTruthy();
    expect(board.winner).toBe(players.Player);
  });
});

function playGame(board: Board, player: Player) {
  for (let i = 0; i < 10; i++) {
    board.occupyCell(player);
  }
}
