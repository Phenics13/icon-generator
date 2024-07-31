import { Component, Input } from '@angular/core';
import { Color } from '../../models/generateForm.model';

@Component({
  selector: 'app-colorbox',
  standalone: true,
  imports: [],
  templateUrl: './colorbox.component.html',
  styleUrl: './colorbox.component.scss',
})
export class ColorboxComponent {
  @Input() color: Color = { name: '', hex: '' };
  @Input() selected: boolean = false;
}
