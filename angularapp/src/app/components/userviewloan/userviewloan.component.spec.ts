import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UserViewloanComponent } from './userviewloan.component';
import { UserViewLoanComponent } from './userviewloan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserviewloanComponent', () => {
  let component: UserViewLoanComponent;
  let fixture: ComponentFixture<UserViewLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserViewLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewloan_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_available_loans_heading_in_the_userviewloan_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Available Loans');
  });
});
