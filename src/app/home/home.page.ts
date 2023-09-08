import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuario: string;

  constructor(private userService: UserService) {
    this.nombreUsuario = this.userService.getNombreUsuario();
  }

}
