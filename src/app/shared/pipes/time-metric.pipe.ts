import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeMetric',
  pure: true,
  standalone: true,
})
export class TimeMetricPipe implements PipeTransform {
  transform(timeInMs: unknown): string {
    if (typeof timeInMs !== 'number') return 's';

    if (timeInMs > 1000) {
      return 's';
    } else {
      return 'ms';
    }
  }
}
