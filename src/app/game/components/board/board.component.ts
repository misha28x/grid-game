import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cell } from '../../../board/cell';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() cells: Cell[] = [];
  @Input() contestedCell: null | number = null;

  @Output() cellOccupied = new EventEmitter();

  onCellClicked(id: number) {
    if (id !== this.contestedCell) return;
    this.cellOccupied.emit();
  }

  trackCell(_: number, item: Cell) {
    return item.id;
  }
}
