import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pointbar-project';

  constructor(public router: Router) {}

  shouldShowSidebar(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }
}
