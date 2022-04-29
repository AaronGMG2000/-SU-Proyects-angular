import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroDetailComponent } from './siniestro-detail.component';

describe('SiniestroDetailComponent', () => {
  let component: SiniestroDetailComponent;
  let fixture: ComponentFixture<SiniestroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestroDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
