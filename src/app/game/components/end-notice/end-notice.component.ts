import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from 'ui/card/card.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Player } from 'board/player';
import { ButtonComponent } from 'ui/button/button.component';
import { GameStatus } from '../../models/game-state';

interface ModalData {
  winner: NonNullable<Player>;
  score: [number, number];
}

@Component({
  selector: 'app-end-notice',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './end-notice.component.html',
  styleUrls: ['./end-notice.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndNoticeComponent {
  data: ModalData = inject(DIALOG_DATA);
  ref = inject(DialogRef<GameStatus | null>);

  get score() {
    return this.data.score.join(' - ');
  }

  goToSettings() {
    this.ref.close('settings');
  }

  playAgain() {
    this.ref.close('play');
  }
}
