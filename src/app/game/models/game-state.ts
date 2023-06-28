import { Cell } from 'board/cell';
import { Board } from 'board/board';
import { Player, Score } from 'board/player';

export type GameStatus = 'settings' | 'play' | 'ended';

export interface BoardState {
  cells: Cell[];
  contested: number | null;
  winner: Player | null;
  score: Score;
  ended: boolean;
}

export interface GameState {
  timeToReact: number;
  status: GameStatus;
  board: BoardState;
}

export const initialState: GameState = {
  timeToReact: 1000,
  status: 'settings',
  board: {
    cells: [],
    contested: 1,
    ended: false,
    winner: null,
    score: {
      computer: 0,
      player: 0,
    },
  },
};

export function getBoardState({
  winner,
  ended,
  score,
  cells,
  contestedCellIdx,
}: Board): BoardState {
  return {
    winner,
    ended,
    score,
    cells,
    contested: contestedCellIdx,
  };
}
