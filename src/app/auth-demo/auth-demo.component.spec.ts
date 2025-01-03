import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDemoComponent } from './auth-demo.component';

describe('AuthDemoComponent', () => {
  let component: AuthDemoComponent;
  let fixture: ComponentFixture<AuthDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
