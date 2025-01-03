import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaaliyetComponent } from './faaliyet.component';

describe('FaaliyetComponent', () => {
  let component: FaaliyetComponent;
  let fixture: ComponentFixture<FaaliyetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaaliyetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
