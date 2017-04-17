import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { WeddingDetailsComponent } from './components/wedding-details/wedding-details.component';

import { DelayGuard } from './guards/delay.guard';
import { MenuService } from './services/menu.service';
import { RsvpService } from './services/rsvp.service';
import { MenuComponent } from './components/menu/menu.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { GuestComponent } from './components/rsvp/guest/guest.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    WeddingDetailsComponent,
    MenuComponent,
    RsvpComponent,
    GuestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    DelayGuard,
    MenuService,
    RsvpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
