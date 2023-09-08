import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombreUsuario: string = ''; 
  contrasenia: string = '';  

  constructor(private userService: UserService) {}

  onUsernameChange(event: any) {
    this.nombreUsuario = event.target.value; 
    this.userService.setNombreUsuario(this.nombreUsuario); 
  }

  onPasswordChange(event: any) {
    this.contrasenia = event.target.value; 
    this.userService.setContrasenia(this.contrasenia); 
  }

  ngOnInit() {
    

  }
}
