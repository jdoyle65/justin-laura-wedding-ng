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

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    WeddingDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [DelayGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
