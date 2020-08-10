import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePComponent } from './table-p.component';

describe('TablePComponent', () => {
  let component: TablePComponent;
  let fixture: ComponentFixture<TablePComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
