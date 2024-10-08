import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFormComponent } from './generate-form.component';

describe('GenerateFormComponent', () => {
  let component: GenerateFormComponent;
  let fixture: ComponentFixture<GenerateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
