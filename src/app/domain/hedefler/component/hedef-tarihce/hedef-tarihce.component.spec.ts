import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HedefTarihceComponent } from './hedef-tarihce.component';

describe('HedefTarihceComponent', () => {
  let component: HedefTarihceComponent;
  let fixture: ComponentFixture<HedefTarihceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HedefTarihceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HedefTarihceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
