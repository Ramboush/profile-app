import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfilePageComponent } from './modules/profile/pages/profile-page/profile-page.component';
import { LoginPageComponent } from './modules/login/pages/login-page/login-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'profile' },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent },
    { path: '**',   redirectTo: '/profile' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
