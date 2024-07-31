import { Component, Input } from '@angular/core';
import { Benefit } from '../../services/home.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './benefit-card.component.html',
  styleUrl: './benefit-card.component.scss',
})
export class BenefitCardComponent {
  @Input() benefit: Benefit = {} as Benefit;
}
