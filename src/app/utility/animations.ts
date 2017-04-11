import { trigger, state, transition, animate, style } from '@angular/animations';


export const routeAnimation = trigger('routeAnimation', [
    state('in', style({ opacity: 1 })),
    transition('void => *', [
        style({ opacity: 0 }),
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)')
    ]),
    transition('* => void',
        animate('0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)', style({
            opacity: 0
        }))
    )
])