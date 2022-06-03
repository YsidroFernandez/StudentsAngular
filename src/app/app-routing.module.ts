import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  StudentsComponent
} from '../app/pages';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full' 
  },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentsComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
