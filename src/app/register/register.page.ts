import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  tipoDeUsuario: string = 'Pasajero';

  constructor() { }

  registrarse() {
    console.log('Ola');
  }

  ngOnInit() {
  }

}
