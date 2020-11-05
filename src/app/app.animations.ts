import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const onInitAnimate = trigger('onInitAnimate', [
  state(
    'close',
    style({
      bottom: '100%',
    })
  ),
  state(
    'open',
    style({
      bottom: '0%',
    })
  ),
  transition('close => open', animate('250ms')),
  transition('open => close', animate('250ms')),
]);
