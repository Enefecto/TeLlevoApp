import { Component, OnInit } from '@angular/core';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  USUARIOS: any[] = [];

  found = false;
  notFound = true;

  username = '';
  password = '';

  usuario: any;

  //Booleanos para mensajes informativos
  success = false;
  fail = false;

  constructor(private apiService: ApiRestServiceService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.found = false;
    this.notFound = true;
    this.success = false;
    this.fail = false;
    this.username = '';
    this.password = '';
    this.apiService.getUsuarios().subscribe((data: any) => { // Cambiado de any[] a any
      this.USUARIOS = data;
    });
  }

  buscar() {
    this.found = false;
    this.notFound = true;

    const usuario = this.USUARIOS.find(u => u.username === this.username);

    if (usuario) {
      this.usuario = usuario;
      this.found = true;
      this.notFound = false;
      this.fail = false;
    } else {
      this.fail = true;
    }
  }

  recuperar(){
    const nuevoUsuario = {
      ...this.usuario,
      password: this.password
    };

    // Envía la solicitud PUT
    this.apiService.modificarUsuario(nuevoUsuario, nuevoUsuario.id).subscribe(
      () => {
        this.success = true;
        this.fail = false;
      },
      error => {
        this.success = false;
      }
    );
    console.log(nuevoUsuario);
  }
}
