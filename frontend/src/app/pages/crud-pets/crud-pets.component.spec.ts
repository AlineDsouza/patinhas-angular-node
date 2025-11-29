import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPetsComponent } from './crud-pets.component';

describe('CrudPetsComponent', () => {
  let component: CrudPetsComponent;
  let fixture: ComponentFixture<CrudPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
