import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaDetailComponent } from './compania-detail.component';

describe('CompaniaDetailComponent', () => {
  let component: CompaniaDetailComponent;
  let fixture: ComponentFixture<CompaniaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
