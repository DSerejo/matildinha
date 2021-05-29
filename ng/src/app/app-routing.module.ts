import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventosComponent } from './eventos/eventos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: "full"},
  {path:'home', component: HomeComponent},
  {path:'evento', component: EventComponent},
  {path:'eventos', component: EventosComponent},
  {path:'help', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
