import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  data: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { usuario: string };
    if (state && state.usuario) {
      this.data = JSON.parse(state.usuario);
    } else {
      this.data = {username: ''}
    }
  }

  cerrarSesion(){
    localStorage.setItem('ingresado','false');
    if(localStorage.getItem('recordarme') !== 'true'){
      localStorage.setItem('user','');
    }
    this.router.navigate(['/login']);
  }
}
