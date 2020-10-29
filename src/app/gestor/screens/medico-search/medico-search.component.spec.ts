import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoSearchComponent } from './medico-search.component';

describe('MedicoSearchComponent', () => {
  let component: MedicoSearchComponent;
  let fixture: ComponentFixture<MedicoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
