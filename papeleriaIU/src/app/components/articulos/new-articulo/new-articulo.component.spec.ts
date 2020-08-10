import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticuloComponent } from './new-articulo.component';

describe('NewArticuloComponent', () => {
  let component: NewArticuloComponent;
  let fixture: ComponentFixture<NewArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
