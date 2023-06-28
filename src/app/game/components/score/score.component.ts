import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, map } from 'rxjs';

import { CardComponent } from 'ui/card/card.component';
import { TimeValuePipe } from 'shared/pipes/time-value.pipe';
import { TimeMetricPipe } from 'shared/pipes/time-metric.pipe';

import { GameStore } from '../../services/game-store.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, CardComponent, TimeValuePipe, TimeMetricPipe],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  store = inject(GameStore);

  score$ = this.store.board$.pipe(map((board) => board.score));
  timer$ = combineLatest(
    this.store.timer$,
    this.store.status$,
    (time, status) => {
      if (status === 'ended') return 0;
      return time;
    }
  );
}
