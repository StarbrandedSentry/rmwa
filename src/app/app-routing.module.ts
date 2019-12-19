import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { SadminConfigureComponent } from './home/sadmin-configure/sadmin-configure.component';
import { SadminPowersComponent } from './home/sadmin-powers/sadmin-powers.component';
import { DashComponent } from './home/dash/dash.component';
import { CreateCenterComponent } from './home/sadmin-powers/create-center/create-center.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', // HOME COMPONENT
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full' },
      { path: 'dash', component: DashComponent },
      {
        path: 's-configure',
        component: SadminConfigureComponent
      },
      { path: 'centers', component: SadminPowersComponent },
      { path: 'create-center', component: CreateCenterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
