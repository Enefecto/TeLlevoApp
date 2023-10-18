import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  //Todos los usuarios
  USUARIOS: object = {};
  
  user = '';
  loading = false;
  constructor(
    private router: Router,
    private apiService: ApiRestServiceService
  ) {}

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

  ngOnInit() {
    this.apiService.getUsuarios().subscribe(data => {
      this.USUARIOS = data;
      console.log(this.USUARIOS);
    });
  }
}
