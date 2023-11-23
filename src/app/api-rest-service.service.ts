import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiRestServiceService {

  constructor(
    private http: HttpClient,
  ) { } 

  getUsuarios() {
    const url = 'http://127.0.0.1:8000/api/usuarios/';
    return this.http.get(url);
  }

  crearUsuario(usuario: any) {
    const url = 'http://127.0.0.1:8000/api/usuarios/';
    return this.http.post(url, usuario);
  }

  modificarUsuario(usuario :any, id: any){
    const url = `http://127.0.0.1:8000/api/usuarios/${id}/`;
    return this.http.put(url,usuario);
  }

  getViajes(){
    const url = 'http://127.0.0.1:8000/api/viajes/';
    return this.http.get(url);
  }

  crearViaje(viaje: any){
    const url = 'http://127.0.0.1:8000/api/viajes/';
    return this.http.post(url,viaje);
  }

  actualizarViaje(viaje: any, id: number) {
    const url = `http://127.0.0.1:8000/api/viajes/${id}/`;
    return this.http.put(url, viaje);
  }

  eliminarViaje(id: number) {
    const url = `http://127.0.0.1:8000/api/viajes/${id}/`;
    return this.http.delete(url);
  }
}
