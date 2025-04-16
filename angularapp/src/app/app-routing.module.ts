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


const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrationComponent },
{ path: 'navbar', component: NavbarComponent },
{ path: 'loanform', component: LoanformComponent},
{ path: 'createloan', component: CreateloanComponent },
{ path: 'viewloan', component: ViewloanComponent },
{ path: 'requestedloan', component: RequestedloanComponent },
{ path: 'usernav', component: UsernavComponent },
{ path: 'userappliedloan', component: UserappliedloanComponent },
{ path: 'userviewloan', component: UserviewloanComponent },
{ path: 'useraddfeedback', component: UseraddfeedbackComponent },
{ path: 'userviewfeedback', component: UserviewfeedbackComponent },
{ path: 'adminnav', component: AdminnavComponent },
{ path: 'admineditloan', component: AdmineditloanComponent },
{ path: 'adminviewfeedback', component: AdminviewfeedbackComponent },
{ path: '**', component: ErrorComponent },
{path:'',redirectTo: 'home',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
