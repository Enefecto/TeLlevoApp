import { Component } from '@angular/core';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage {
  VIAJES: any[] = [];
  userId: string | null = null;

  constructor(private apiService: ApiRestServiceService) {}

  ionViewWillEnter() {
    this.userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    this.cargarViajesPasajero();
  }

  cargarViajesPasajero() {
    if (this.userId) {
      this.apiService.getViajes().subscribe((data: any) => {
        this.VIAJES = data.filter((viaje: any) => viaje.idPasajeros?.split(',').includes(this.userId?.toString()));
      });
    }
  }

  Cancelar(viaje: any) {
    if (this.userId) {
      const viajeActualizado = { ...viaje };
      const pasajeros = viajeActualizado.idPasajeros?.split(',') || [];
      const index = pasajeros.indexOf(this.userId.toString());
      if (index !== -1) {
        pasajeros.splice(index, 1); 
        viajeActualizado.idPasajeros = pasajeros.join(','); 

        // Realizar el PUT al backend para actualizar el viaje
        this.apiService.actualizarViaje(viajeActualizado, viaje.id).subscribe(() => {
          // Hacer un GET a los viajes para actualizar la lista en el componente
          this.cargarViajesPasajero();
        });
      }
    }
  }
}
