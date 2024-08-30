import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { VehiclesListComponent } from './components/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesDetailsComponent } from './components/vehicles/vehicles-details/vehicles-details.component';
import { RegisterComponent } from './components/layout/register/register.component';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent },
  {path: "admin", component: PrincipalComponent, children: [
    {path: "carros", component: VehiclesListComponent},
    {path: "carros/new", component: VehiclesDetailsComponent},
    {path: "carros/edit/:id", component: VehiclesDetailsComponent}
  ]}
];
