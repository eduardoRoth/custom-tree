import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithNavigationPage } from './with-navigation.page';

describe('WithNavigationPage', () => {
  let component: WithNavigationPage;
  let fixture: ComponentFixture<WithNavigationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WithNavigationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
