import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaSeguroDetailComponent } from './compania-seguro-detail.component';

describe('CompaniaSeguroDetailComponent', () => {
  let component: CompaniaSeguroDetailComponent;
  let fixture: ComponentFixture<CompaniaSeguroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniaSeguroDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniaSeguroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
