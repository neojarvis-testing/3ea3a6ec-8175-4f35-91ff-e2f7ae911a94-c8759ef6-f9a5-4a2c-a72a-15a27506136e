import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { DeleteButtonRendererComponent } from './components/delete-button-renderer/delete-button-renderer.component';
@NgModule({
  declarations: [
    AppComponent,
    AdmineditloanComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    CreateloanComponent,
    ErrorComponent,
    HomeComponent,
    LoanformComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    RequestedloanComponent,
    UseraddfeedbackComponent,
    UserappliedloanComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    UserviewloanComponent,
    ViewloanComponent,
    FooterComponent,
    LandingComponent,
    DeleteButtonRendererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
