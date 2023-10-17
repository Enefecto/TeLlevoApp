import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  user = '';
  loading = false;
  constructor(private router: Router) {}
  
  login() {
    this.loading = true;
    let userData: NavigationExtras = {
      state: {user: this.user}
    };
  
    setTimeout(() => {
      this.router.navigate(['/home'], userData);
      this.loading = false;
    }, 2000);
  }
}
