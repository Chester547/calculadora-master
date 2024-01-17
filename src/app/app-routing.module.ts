import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PanelComponent } from './pages/panel/panel.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {AngularFireAuthGuard, canActivate} from '@angular/fire/compat/auth-guard';
import {map} from 'rxjs/operators';
import { RegisterComponent } from './pages/register/register.component';
import { InfoupComponent } from './pages/infoup/infoup.component';
import { ShoweventComponent } from './pages/showevent/showevent.component';

const uidAdmin = 'NkHvXiRmJ2UC5RpWuZSReeUUBe62';
const onlyAdmin = () => map ((user: any) => !!user && (user.uid === uidAdmin));

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent },
  {path: 'panel', component: PanelComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'perfil', component: ProfileComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'cargainfo', component: InfoupComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'eventos', component: ShoweventComponent, canActivate: [AngularFireAuthGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
