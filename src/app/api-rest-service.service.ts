import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiRestServiceService {

  constructor(private http: HttpClient) { } 

  getUsuarios() {
    const url = 'http://127.0.0.1:8000/api/usuarios/';
    return this.http.get(url);
  }

  crearUsuario(usuario: any) {
    const url = 'http://127.0.0.1:8000/api/usuarios/';
    return this.http.post(url, usuario);
  }
}