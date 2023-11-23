import { Component } from '@angular/core';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage {

  VIAJES: any[] = [];
  userId: string | null = null;

  constructor(private apiService: ApiRestServiceService) {}

  ionViewWillEnter(){
    this.userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    this.apiService.getViajes().subscribe((data: any) => {
      this.VIAJES = data;
    });
  }

  viajar(viaje: any) {
    if (this.userId) {
      const userIdString = `,${this.userId}`; // Convertimos el ID del usuario a un string con una coma al inicio
  
      // Validación: Verificar si el usuario ya está en el viaje
      if (viaje.idPasajeros) {
        const pasajerosArray = viaje.idPasajeros.split(',').map((id: string) => id.trim()); // Convertir a array y quitar espacios
        const userIdStringToCheck = this.userId.toString(); // Convertir el ID de usuario a string
        
        if (pasajerosArray.includes(userIdStringToCheck)) {
          return; // Salir del método si el pasajero ya está en el viaje
        }
      }
  
      // Validación: Verificar límite de pasajeros en el viaje (por ejemplo, 3 pasajeros)
      const pasajerosActuales = viaje.idPasajeros ? viaje.idPasajeros.split(',').length : 0;
      const limitePasajeros = viaje.pasajeros + 1;
  
      if (pasajerosActuales >= limitePasajeros) {
        return; // Salir del método si se alcanzó el límite de pasajeros
      }
  
      // Actualizar idPasajeros con el ID del usuario
      if (!viaje.idPasajeros) {
        viaje.idPasajeros = userIdString;
      } else {
        viaje.idPasajeros += userIdString;
      }
  
      // Realizar la actualización del viaje en el backend
      this.apiService.actualizarViaje(viaje, viaje.id).subscribe(
        (data) => {
          console.log('Viaje actualizado exitosamente');
          // Aquí puedes realizar acciones adicionales después de actualizar el viaje, si es necesario.
        },
        (error) => {
          console.error('Error al actualizar el viaje', error);
          // Manejo de errores, si es necesario.
        }
      );
    }
  }
  
}
