import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { GenerateComponent } from './routes/generate/generate.component';
import { IconsComponent } from './routes/icons/icons.component';
import { ProfileComponent } from './routes/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'generate', component: GenerateComponent },
  { path: 'icons', component: IconsComponent },
];
