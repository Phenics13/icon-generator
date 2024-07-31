import { Component } from '@angular/core';
import { GenerateFormComponent } from '../../components/generate-form/generate-form.component';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [GenerateFormComponent],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.scss',
})
export class GenerateComponent {}
