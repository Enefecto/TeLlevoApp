import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterViajePageRoutingModule } from './register-viaje-routing.module';

import { RegisterViajePage } from './register-viaje.page';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterViajePageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  declarations: [RegisterViajePage]
})
export class RegisterViajePageModule {}