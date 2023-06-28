import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeValue',
  pure: true,
  standalone: true,
})
export class TimeValuePipe implements PipeTransform {
  transform(timeInMs: unknown) {
    if (typeof timeInMs !== 'number') return 0;

    if (timeInMs > 1000) return (timeInMs / 1000).toFixed(2);
    return timeInMs;
  }
}
