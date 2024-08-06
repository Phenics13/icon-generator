import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  BENEFITS,
  Benefit,
  REVIEWS,
  Review,
} from '../../services/home.service';
import { BenefitCardComponent } from '../../components/benefit-card/benefit-card.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonModule, BenefitCardComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  benefits: Benefit[] = BENEFITS;
  reviews: Review[] = REVIEWS;

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
