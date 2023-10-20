import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Todos los usuarios
  USUARIOS: any[] = []; // Cambiado a un arreglo de usuarios

  username = '';
  password = '';
  recordarme = false;

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

      if (this.recordarme) {
        // Si el checkbox está marcado, guardar en el localStorage
        localStorage.setItem('recordarme', 'true');
      } else {
        // Si el checkbox no está marcado, remover del localStorage
        localStorage.removeItem('recordarme');
      }

      const usuarioJSON = JSON.stringify(usuario);
      localStorage.setItem('user',usuarioJSON);
      setTimeout(() => {
        // Pasar al home
        this.router.navigate(['/home'],{ state: { usuario: usuarioJSON } });
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
    const recordarme = localStorage.getItem('recordarme');
    this.recordarme = recordarme === 'true';
  }

  ionViewWillEnter() {
    this.fail = false;
    this.success = false;
    this.username = '';
    this.password = '';

    if (localStorage.getItem('recordarme') == 'true') {
      let userJSON = localStorage.getItem('user');
      if (userJSON) {
        let user = JSON.parse(userJSON);
        this.username = user.username;
        this.password = user.password;
      }
    }

    this.apiService.getUsuarios().subscribe((data: any) => { // Cambiado de any[] a any
      this.USUARIOS = data;
    });
  }
}