import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IsBirlikComponent } from './is-birlik.component';

describe('IsBirlikComponent', () => {
  let component: IsBirlikComponent;
  let fixture: ComponentFixture<IsBirlikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsBirlikComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsBirlikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
