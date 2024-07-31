import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GenerateFormComponent } from './components/generate-form/generate-form.component';
import { Store, select } from '@ngrx/store';
import { State } from './reducers';
import { userCheckAuth } from './reducers/user/user.actions';
import { ImageListComponent } from './components/image-list/image-list.component';
import { selectUser, selectUserId } from './reducers/user/user.selectors';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    GenerateFormComponent,
    ImageListComponent,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'icon-generator';
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(userCheckAuth());
  }
}
