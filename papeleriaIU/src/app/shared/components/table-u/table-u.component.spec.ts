import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUComponent } from './table-u.component';

describe('TableUComponent', () => {
  let component: TableUComponent;
  let fixture: ComponentFixture<TableUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
