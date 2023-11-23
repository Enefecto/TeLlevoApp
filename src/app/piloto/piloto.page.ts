import { Component } from '@angular/core';
import { ApiRestServiceService } from '../api-rest-service.service';

@Component({
  selector: 'app-piloto',
  templateUrl: './piloto.page.html',
  styleUrls: ['./piloto.page.scss'],
})
export class PilotoPage {

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
    const viajeId = viaje.id;

    this.apiService.eliminarViaje(viajeId).subscribe(() => {
      // Una vez eliminado el viaje, cargar los viajes actualizados
      this.cargarViajesPasajero();
    });
  }
}
