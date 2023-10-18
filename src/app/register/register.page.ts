import { Component, OnInit } from '@angular/core';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //Todos los usuarios
  USUARIOS: object = {};

  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  tipoDeUsuario: string = '';

  //Booleanos para mensajes informativos
  success = false;
  fail = false;


  constructor(
    private apiService: ApiRestServiceService
  ) { }

  registrarse() {
    if (
      this.username.trim() === '' ||
      this.password.trim() === '' ||
      this.nombre.trim() === '' ||
      this.apellido.trim() === '' ||
      this.telefono.trim() === '' ||
      this.tipoDeUsuario.trim() === ''
    ) {
      // Si al menos uno de los campos está vacío, no se ejecuta la petición.
      return;
    }

    const nuevoUsuario = {
      "username": this.username,
      "password": this.password,
      "nombre": this.nombre,
      "apellido": this.apellido,
      "telefono": this.telefono,
      "tipoDeUsuario": this.tipoDeUsuario
    };

    // Verificar si ya existe un usuario con el mismo username
    const usuarios = Object.values(this.USUARIOS);
    const usuarioExistente = usuarios.find((usuario: any) => usuario.username === this.username);

    if (usuarioExistente) {
      this.fail = true;
      this.success = false;
      console.log('entre');
    } else {
      this.success = true;
      this.fail = false;

      //Solicitud POST para crear al Usuario.
      this.apiService.crearUsuario(nuevoUsuario).subscribe(data => {
        console.log('Usuario creado correctamente:', data);
      });

      //Solicitud GET para actualizar usuarios en USUARIOS.
      this.apiService.getUsuarios().subscribe(data => {
        this.USUARIOS = data;
      });
    }
  }

  ngOnInit() {
    this.success = false;
    this.fail = false;
    this.apiService.getUsuarios().subscribe(data => {
      this.USUARIOS = data;
    });
  }

}
