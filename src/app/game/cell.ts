import { Occupation, occupations } from './player';

export interface Cell {
  id: number;
  row: number;
  col: number;
  occupation: Occupation;
  isContested: boolean;
}

export function createCell(row: number, col: number, id: number): Cell {
  return {
    id,
    row,
    col,
    occupation: occupations.None,
    isContested: false,
  };
}
