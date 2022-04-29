import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaSeguroComponent } from './compania-seguro.component';

describe('CompaniaSeguroComponent', () => {
  let component: CompaniaSeguroComponent;
  let fixture: ComponentFixture<CompaniaSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniaSeguroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
