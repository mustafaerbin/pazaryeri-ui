import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoyutKumeComponent } from './boyut-kume.component';

describe('BoyutKumeComponent', () => {
  let component: BoyutKumeComponent;
  let fixture: ComponentFixture<BoyutKumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoyutKumeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoyutKumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
