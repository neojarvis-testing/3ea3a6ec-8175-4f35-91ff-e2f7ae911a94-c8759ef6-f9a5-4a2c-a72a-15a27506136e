import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './components/authguard/authguard.guard';


const routes: Routes = [{path:'',component:LandingComponent},
{ path: 'home', component: HomeComponent },
{path:'landing',component:LandingComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrationComponent },
{ path: 'navbar', component: NavbarComponent },
{ path: 'loanform', component: LoanformComponent,canActivate:[AuthGuard], data:{role : 'User'}},
{ path: 'createloan', component: CreateloanComponent,canActivate:[AuthGuard], data:{role : 'Admin'} },
{ path: 'viewloan', component: ViewloanComponent,canActivate:[AuthGuard], data:{role : 'Admin'} },
{ path: 'requestedloan', component: RequestedloanComponent,canActivate:[AuthGuard], data:{role : 'Admin'} },
{ path: 'usernav', component: UsernavComponent,canActivate:[AuthGuard], data:{role : 'User'} },
{ path: 'userappliedloan', component: UserappliedloanComponent,canActivate:[AuthGuard], data:{role : 'User'} },
{ path: 'userviewloan', component: UserviewloanComponent,canActivate:[AuthGuard], data:{role : 'User'} },
{ path: 'useraddfeedback', component: UseraddfeedbackComponent,canActivate:[AuthGuard], data:{role : 'User'}},
{ path: 'userviewfeedback', component: UserviewfeedbackComponent,canActivate:[AuthGuard], data:{role : 'User'} },
{ path: 'adminnav', component: AdminnavComponent,canActivate:[AuthGuard], data:{role : 'Admin'} },
{ path: 'admineditloan/:id', component: AdmineditloanComponent,canActivate:[AuthGuard], data:{role : 'Admin'}},
{ path: 'adminviewfeedback', component: AdminviewfeedbackComponent,canActivate:[AuthGuard], data:{role : 'Admin'} },
{ path: 'error', component: ErrorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
