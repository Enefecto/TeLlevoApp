import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  data: any;
  USER: any;
  username: String = '';

  pasajero = false;
  piloto = false;

  constructor(private router: Router) {

  }

  cerrarSesion(){
    localStorage.setItem('ingresado','false');
    if(localStorage.getItem('recordarme') !== 'true'){
      localStorage.setItem('user','');
    }
    this.router.navigate(['/login']);
  }
  ionViewWillEnter(){

    this.username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : null;

    this.pasajero = false;
    this.piloto = false;
    let JSONdata = localStorage.getItem('user');
    this.USER = JSON.parse(JSONdata || '');
    if (this.USER.tipoDeUsuario === 'Pasajero'){
      this.pasajero = true;
    } else if (this.USER.tipoDeUsuario === 'Piloto'){
      this.piloto = true;
    }
  }
}
