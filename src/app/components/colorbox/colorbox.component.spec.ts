import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorboxComponent } from './colorbox.component';

describe('ColorboxComponent', () => {
  let component: ColorboxComponent;
  let fixture: ComponentFixture<ColorboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
