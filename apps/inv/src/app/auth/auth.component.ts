import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES, RouterModule, RouterOutlet, provideRouter } from '@angular/router';
import { authRoutes } from './auth.routes';

@Component({
  selector: 'inv-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent  {}
