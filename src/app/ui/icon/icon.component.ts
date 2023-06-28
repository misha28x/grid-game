import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() key = '';
  @Input() description = '';

  @HostBinding('style.height.px')
  @Input()
  size!: number;

  get src() {
    return `/assets/icons/${this.key}.svg`;
  }
}
