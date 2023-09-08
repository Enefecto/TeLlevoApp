// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nombreUsuario: string = '';
  private contrasenia: string = '';

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }
  getNombreUsuario() {
    return this.nombreUsuario;
  }

  setContrasenia(contrasenia: string) {
    this.contrasenia = contrasenia;
  }
  getContrasenia() {
    return this.contrasenia;
  }
  
}
