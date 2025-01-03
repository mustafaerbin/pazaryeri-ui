import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HedefOranComponent } from './hedef-oran.component';

describe('HedefOranComponent', () => {
  let component: HedefOranComponent;
  let fixture: ComponentFixture<HedefOranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HedefOranComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HedefOranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
