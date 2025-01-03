import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPageSearchComponent } from './menu-page-search.component';

describe('MenuPageSearchComponent', () => {
  let component: MenuPageSearchComponent;
  let fixture: ComponentFixture<MenuPageSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPageSearchComponent]
    });
    fixture = TestBed.createComponent(MenuPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
