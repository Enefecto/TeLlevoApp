import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  user = '';
  
  constructor(private router: Router) {}
  
  login() {
    let userData: NavigationExtras = {
      state: {user: this.user}
    };

    this.router.navigate(['/home'], userData);
    console.log(userData);
  }
}
