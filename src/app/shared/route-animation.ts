// route-animations.ts
import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  // Navegación hacia adelante: de un valor numérico menor a mayor
  transition(
    (fromState: string, toState: string) => Number(fromState) < Number(toState),
    [
      query(
        ':enter, :leave',
        [
          style({
            position: 'fixed',
            width: '100%',
          }),
        ],
        { optional: true }
      ),
      group([
        // El componente saliente se desplaza a la izquierda
        query(
          ':leave',
          [animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))],
          { optional: true }
        ),
        // El componente entrante comienza a la derecha
        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
          ],
          { optional: true }
        ),
      ]),
    ]
  ),
  // Navegación hacia atrás: de un valor numérico mayor a menor
  transition(
    (fromState: string, toState: string) => Number(fromState) > Number(toState),
    [
      query(
        ':enter, :leave',
        [
          style({
            position: 'fixed',
            width: '100%',
          }),
        ],
        { optional: true }
      ),
      group([
        // El componente saliente se desplaza a la derecha
        query(
          ':leave',
          [animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))],
          { optional: true }
        ),
        // El componente entrante comienza a la izquierda
        query(
          ':enter',
          [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-out', style({ transform: 'translateX(0%)' })),
          ],
          { optional: true }
        ),
      ]),
    ]
  ),
]);
