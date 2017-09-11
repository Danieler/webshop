import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearchartComponent } from './linearchart.component';

describe('LinearchartComponent', () => {
  let component: LinearchartComponent;
  let fixture: ComponentFixture<LinearchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
