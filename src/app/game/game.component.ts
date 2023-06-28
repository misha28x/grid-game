import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ScoreComponent } from './components/score/score.component';
import { SettingsComponent } from './components/settings/settings.component';
import { createFadeAnimation } from 'shared/animations/fade-in-out';
import { GameStore } from './services/game-store.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, BoardComponent, ScoreComponent, SettingsComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [createFadeAnimation({ enterDuration: 500, leaveDuration: 300 })],
  providers: [GameStore],
})
export class GameComponent {
  gameService = inject(GameStore);

  board$ = this.gameService.board$;
  status$ = this.gameService.status$;
  time$ = this.gameService.time$;

  cellClicked() {
    this.gameService.occupyCell();
  }

  gameStarted() {
    this.gameService.startGame();
  }

  updateTime(time: number) {
    this.gameService.updateTime(time);
  }
}
