import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

type Params = { enterDuration?: number; leaveDuration?: number };
export function createFadeAnimation({
  enterDuration = 500,
  leaveDuration = 200,
}: Params) {
  return trigger('fade', [
    state(
      'void',
      style({
        opacity: 0,
        width: '100%',
        transform: 'translateY(-15px)',
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        width: '100%',
        transform: 'translateY(-15px)',
      }),
      animate(
        `${enterDuration}ms ease-in-out`,
        style({
          opacity: 1,
          width: '100%',
          transform: 'translateY(0%)',
        })
      ),
    ]),
    transition(':leave', [
      animate(
        `${leaveDuration}ms ease-in-out`,
        style({
          opacity: 0,
          width: '100%',
          transform: 'translateY(-15px)',
        })
      ),
    ]),
  ]);
}
