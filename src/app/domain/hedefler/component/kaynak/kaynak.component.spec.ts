import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KaynakComponent } from './kaynak.component';

describe('KaynakComponent', () => {
  let component: KaynakComponent;
  let fixture: ComponentFixture<KaynakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KaynakComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KaynakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
