import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DosyaComponent } from './dosya.component';

describe('DosyaComponent', () => {
  let component: DosyaComponent;
  let fixture: ComponentFixture<DosyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DosyaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DosyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
