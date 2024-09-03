import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PajaritoComponent } from './pajarito.component';

describe('pajaritoComponent', () => {
  let component: PajaritoComponent;
  let fixture: ComponentFixture<PajaritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PajaritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PajaritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
