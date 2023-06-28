export const players = {
  Player: 'player',
  Computer: 'computer',
} as const;

export const occupations = {
  ...players,
  None: 'none',
} as const;

export type Occupation = (typeof occupations)[keyof typeof occupations];
export type Player = (typeof players)[keyof typeof players];
export type Score = Record<Player, number>;

export function createScore(): Score {
  return {
    computer: 0,
    player: 0,
  };
}
