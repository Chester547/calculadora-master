import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataUpComponent } from './pages/data-up/data-up.component';
import { FeedComponent } from './pages/feed/feed.component';
import { LoginComponent } from './pages/login/login.component';
import { PanelComponent } from './pages/panel/panel.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {AngularFireAuthGuard, canActivate} from '@angular/fire/compat/auth-guard';
import {map} from 'rxjs/operators';
import { RegisterComponent } from './pages/register/register.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CalculadoraSalariosComponent } from './pages/calculadora-salarios/calculadora-salarios.component';
import { NumberCalculatorComponent } from './pages/number-calculator/number-calculator.component';

const uidAdmin = 'LvtwNStI0wc76vf2oibiaZ0mgkx1';
const onlyAdmin = () => map ((user: any) => !!user && (user.uid === uidAdmin));

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent },
  {path: 'feed', component: FeedComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'carga', component: DataUpComponent, ...canActivate(onlyAdmin) },
  {path: 'panel', component: PanelComponent, canActivate: [AngularFireAuthGuard] },
  {path: 'perfil', component: ProfileComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'detalle', component: DetalleComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'calculadora', component: CalculadoraSalariosComponent, canActivate: [AngularFireAuthGuard]},
  {path: 'testcal', component: NumberCalculatorComponent, canActivate: [AngularFireAuthGuard]},
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
