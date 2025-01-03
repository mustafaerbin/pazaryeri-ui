import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OzetComponent } from './ozet.component';

describe('OzetComponent', () => {
  let component: OzetComponent;
  let fixture: ComponentFixture<OzetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OzetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OzetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
