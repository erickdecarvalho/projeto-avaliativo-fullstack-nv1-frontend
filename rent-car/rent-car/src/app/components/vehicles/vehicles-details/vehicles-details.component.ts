import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Vehicle } from '../../../models/vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles-details',
  standalone: true,
  imports: [MdbFormsModule, CommonModule, FormsModule],
  templateUrl: './vehicles-details.component.html',
  styleUrl: './vehicles-details.component.scss'
})
export class VehiclesDetailsComponent {
  @Input("vehicle") vehicle: Vehicle = new Vehicle(0, "dasdsa", "dsdsa", "dsdsa", "dsadsa", "dsdsa", false);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];

    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    let vehicleReturned: Vehicle = new Vehicle(0, "dasdsa", "dsdsa", "dsdsa", "dsadsa", "dsdsa", true);
    this.vehicle = vehicleReturned;
  }

  save() {
    Swal.fire({
      title: 'Salvo com sucesso!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    this.router2.navigate(['admin/carros'], { state: { newVehicle: this.vehicle } });

    this.retorno.emit(this.vehicle);
  }


}
