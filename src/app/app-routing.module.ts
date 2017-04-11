import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DelayGuard } from './guards/delay.guard';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { WeddingDetailsComponent } from './components/wedding-details/wedding-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SplashScreenComponent
      },
      {
        path: 'wedding-details',
        component: WeddingDetailsComponent
      },
      {
        path: '**',
        redirectTo: '/'
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
