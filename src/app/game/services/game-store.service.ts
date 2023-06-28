import { DestroyRef, inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  share,
  shareReplay,
  switchMap,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';

import { Board } from 'board/board';
import { players } from 'board/player';

import {
  GameState,
  GameStatus,
  getBoardState,
  initialState,
} from '../models/game-state';

import { EndNoticeComponent } from '../components/end-notice/end-notice.component';

@Injectable()
export class GameStore {
  private dialog = inject(Dialog);
  private destroyRef = inject(DestroyRef);

  private board = new Board();
  private state$$ = new BehaviorSubject(initialState);

  board$ = this.select((state) => state.board);
  status$ = this.select((state) => state.status);

  time$ = this.select((state) => state.timeToReact);
  timer$ = this.state$$.pipe(
    map((state) => state.board.contested),
    distinctUntilChanged(),
    withLatestFrom(this.time$),
    switchMap(([, time]) =>
      countdown$(time).pipe(
        distinctUntilChanged(),
        tap((val) => val === 0 && this.timeRunOut())
      )
    ),
    share()
  );

  private ended$ = this.state$$.pipe(
    map((state) => state.board.ended),
    distinctUntilChanged()
  );

  constructor() {
    this.status$.pipe(takeUntilDestroyed()).subscribe((status) => {
      if (status === 'play') {
        this.board = new Board();
        this.board.start();
        this.updateGameState();
      }
    });

    this.ended$
      .pipe(takeUntilDestroyed())
      .subscribe((val) => val && this.endGame());

    this.updateGameState();
  }

  occupyCell() {
    this.board.occupyCell(players.Player);
    this.updateGameState();
  }

  updateTime(time: number) {
    this.patch({ timeToReact: time });
  }

  startGame() {
    this.patch({ status: 'play' });
  }

  endGame() {
    this.patch({ status: 'ended' });

    const state = this.state$$.value;
    const ref = this.dialog.open<GameStatus | null>(EndNoticeComponent, {
      disableClose: true,
      data: {
        winner: state.board.winner,
        score: Object.values(state.board.score),
      },
    });

    ref.closed
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((status) => status || 'play')
      )
      .subscribe((status: GameStatus) => {
        this.patch({ status });
      });
  }

  private timeRunOut() {
    this.board.occupyCell(players.Computer);
    this.updateGameState();
  }

  private updateGameState() {
    const boardState = getBoardState(this.board);
    this.patch({ board: boardState });
  }

  private patch(state: Partial<GameState>) {
    const oldState = this.state$$.value;
    requestAnimationFrame(() => this.state$$.next({ ...oldState, ...state }));
  }

  private select<T>(transform: (state: GameState) => T) {
    return this.state$$.pipe(
      map(transform),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}

function countdown$(timeInMS: number) {
  return timer(0, 100).pipe(
    map((index) => Math.max(0, timeInMS - index * 100))
  );
}
