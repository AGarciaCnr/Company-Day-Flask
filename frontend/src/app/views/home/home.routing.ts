import { Routes } from '@angular/router';

import { HomeOneComponent } from './landing.component';
import { SignUpStudent } from './signupstudent.component';
import { SignUp } from './signup.component';
import { userpage } from './userpage.component';

export const HomeRoutes: Routes = [
  { path: 'LandingPage', component: HomeOneComponent },
  { path: 'SignUpEmpresas', component: SignUpStudent },
  { path: 'SignUp', component: SignUp },
  { path: 'UserPage', component: userpage },

];