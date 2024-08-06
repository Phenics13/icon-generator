import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { State } from '../../reducers';
import { selectUserId } from '../../reducers/user/user.selectors';
import { CommonModule } from '@angular/common';
import { userLogInGoogle, userLogOut } from '../../reducers/user/user.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ToolbarModule,
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userId$ = this.store.pipe(select(selectUserId));

  constructor(private store: Store<State>, private router: Router) {}

  loginClick() {
    this.store.dispatch(userLogInGoogle());
  }

  logoutClick() {
    this.store.dispatch(userLogOut());
  }

  goToPage(path: string) {
    this.router.navigate([path]);
  }
}
