import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';
import { LoginModule } from './modules/login/login.module';
import { ProfileModule } from './modules/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ProfileModule
  ],
  providers: [
      AuthGuard,
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
