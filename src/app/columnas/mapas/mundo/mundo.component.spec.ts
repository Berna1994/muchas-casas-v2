import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MundoComponent } from './mundo.component';

describe('mundoComponent', () => {
  let component: MundoComponent;
  let fixture: ComponentFixture<MundoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MundoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MundoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
