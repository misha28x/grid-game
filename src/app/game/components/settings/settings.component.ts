import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { CardComponent } from 'ui/card/card.component';
import { IconComponent } from 'ui/icon/icon.component';
import { ButtonComponent } from 'ui/button/button.component';
import { clamp } from 'util/clamp';

const MIN_VALUE_MS = 200;
const MAX_VALUE_MS = 10_000;

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    IconComponent,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  timeToReact!: number;

  @Input() set time(val: number | null) {
    if (val) this.timeToReact = val;
  }

  @Output() gameStarted = new EventEmitter();
  @Output() timeChanged = new EventEmitter<number>();

  increase() {
    this.updateTime(this.timeToReact + 100);
  }

  decrease() {
    this.updateTime(this.timeToReact - 100);
  }

  updateTime(time: number = 0) {
    this.timeToReact = clamp(
      coerceNumberProperty(time),
      MIN_VALUE_MS,
      MAX_VALUE_MS
    );

    this.timeChanged.emit(this.timeToReact);
  }
}
