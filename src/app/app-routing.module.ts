import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DelayGuard } from './guards/delay.guard';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { WeddingDetailsComponent } from './components/wedding-details/wedding-details.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { GiftsComponent } from './components/gifts/gifts.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: SplashScreenComponent
      },
      {
        path: 'wedding-details',
        component: WeddingDetailsComponent
      },
      {
        path: 'rsvp',
        component: RsvpComponent
      },
      {
        path: 'registry',
        component: GiftsComponent
      },
      {
        path: '**',
        redirectTo: '/home'
      }
    ],
    canActivate: [DelayGuard],
    canDeactivate: [DelayGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
