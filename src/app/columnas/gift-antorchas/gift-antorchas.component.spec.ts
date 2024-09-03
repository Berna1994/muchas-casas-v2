import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenGiftAntorchasComponent } from './gift-antorchas.component';

describe('GIFTAntorchasComponent', () => {
  let component: ImagenGiftAntorchasComponent;
  let fixture: ComponentFixture<ImagenGiftAntorchasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenGiftAntorchasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenGiftAntorchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
