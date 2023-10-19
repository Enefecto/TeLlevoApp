import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // Todos los usuarios
  USUARIOS: any[] = []; // Cambiado a un arreglo de usuarios

  username = '';
  password = '';

  loading = false;

  //Booleanos para mensajes informativos
  success = false;
  fail = false;

  constructor(
    private router: Router,
    private apiService: ApiRestServiceService
  ) {}

  login() {
    this.loading = true;

    // Verificar si el usuario y contraseña coinciden con algún registro
    const usuario = this.USUARIOS.find(
      (u) => u.username === this.username && u.password === this.password
    );

    if (usuario) {
      // Usuario y contraseña válidos
      this.success = true;
      this.fail = false;
      localStorage.setItem('ingresado','true');
      setTimeout(() => {
        // Pasar al home
        this.router.navigate(['/home']);
        this.loading = false;
      }, 2000);
    } else {
      // Usuario o contraseña incorrecto
      this.loading = false;
      this.fail = true;
      this.success = false;
    }
  }

  ngOnInit() {
    this.fail = false;
    this.success = false;
    this.apiService.getUsuarios().subscribe((data: any) => { // Cambiado de any[] a any
      this.USUARIOS = data;
    });
  }
  
}
