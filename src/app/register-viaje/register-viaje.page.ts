import { Component } from '@angular/core';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-register-viaje',
  templateUrl: './register-viaje.page.html',
  styleUrls: ['./register-viaje.page.scss'],
})
export class RegisterViajePage {
  
  VIAJES: object = {};

  dia: String = '';
  hora: String = '';
  pasajeros: number = 0;
  comunaDestino: String = '';
  precio: number = 0;
  idPasajeros: String = '';
  
  //Bollean Validators
  sinPasajeros = false;
  sinPrecio = false;
  success = false;
  fail = false;

  constructor(
    private apiService: ApiRestServiceService
  ) {}

  registrarViaje() {
    this.sinPrecio = false;
    this.sinPasajeros = false;
    this.success = false;

    if (
      this.dia.trim() === '' ||
      this.hora.trim() === '' ||
      this.pasajeros === 0 || 
      this.pasajeros === null || 
      this.comunaDestino.trim() === '' ||
      this.precio === null || 
      this.precio < 1000
    ) {
      this.sinPrecio = false;
      this.sinPasajeros = false;
      if (this.pasajeros === null || this.pasajeros === 0){
        this.sinPasajeros = true;
      } else if (this.precio === null || this.precio < 1000) {
        this.sinPrecio = true;
      } else {
        this.sinPasajeros = false;
        this.sinPrecio = false;
      }
      return;
    }

    const nuevaFecha = new Date(this.dia + 'T' + this.hora);

    const nuevoViaje = {
      "dia": this.dia,
      "hora": nuevaFecha.toTimeString().split(' ')[0], // Obtiene la hora en formato HH:MM:SS
      "pasajeros": this.pasajeros,
      "comunaDestino": this.comunaDestino,
      "Precio": this.precio,
      "idPasajeros": this.idPasajeros
    };

    // Solicitud POST para crear el viaje.
    this.apiService.crearViaje(nuevoViaje).subscribe(
      (data) => {
        // La solicitud se completó exitosamente, aquí puedes realizar acciones con la respuesta 'data'
        this.success = true; 
        this.fail = false; 
      },
      (error) => {
        // La solicitud tuvo un error, puedes manejarlo aquí
        this.success = false; 
        this.fail = true; 
      }
    );
  }

  ionViewWillEnter() {
    const user = localStorage.getItem('user');
    if (user !== null) {
      this.idPasajeros = JSON.parse(user).id;
    } else {
      console.log('User data not found in localStorage');
    }
  }
  
}
