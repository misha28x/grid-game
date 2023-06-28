import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cell } from '../../../board/cell';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @Input() cell!: Cell;
  @Input() contested = false;

  @HostBinding('style.grid-area')
  get area() {
    return `${this.row}/${this.col}/${this.row}/${this.col}`;
  }

  @HostBinding('class') get cellClass() {
    if (this.contested) return `contested`;
    return this.cell.occupation;
  }

  get row() {
    return this.cell.row + 1;
  }

  get col() {
    return this.cell.col + 1;
  }
}
