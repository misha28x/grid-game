import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonColor = 'default' | 'yellow' | 'red';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() color: ButtonColor = 'default';

  @HostBinding('attr.type')
  @Input()
  type: 'button' | 'submit' = 'button';

  @HostBinding('class') get hostClasses() {
    return `app-button-${this.color}`;
  }
}
