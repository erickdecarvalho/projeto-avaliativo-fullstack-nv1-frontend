import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Vehicle } from '../../../models/vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-vehicles-details',
  standalone: true,
  imports: [MdbFormsModule, CommonModule, FormsModule],
  templateUrl: './vehicles-details.component.html',
  styleUrl: './vehicles-details.component.scss'
})
export class VehiclesDetailsComponent {
  @Input("vehicle") vehicle: Vehicle = new Vehicle(0, "", "", "", "", "", false);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  vehicleService = inject(VehicleService);

  constructor() {
    let id = this.router.snapshot.params['id'];

    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.vehicleService.findById(id).subscribe({
      next: retorno => {
          this.vehicle = retorno
      },
      error(err) {
        Swal.fire({
          title: 'Ocorreu um erro detalhar o veículo',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

  save() {
    if(this.vehicle.id > 0){

      this.vehicleService.update(this.vehicle, this.vehicle.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "Veículo editado com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/carros'], { state: { carroEditado: this.vehicle } });
          this.retorno.emit(this.vehicle);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    }else{
      const { name, vehicleType, chassi, year, color } = this.vehicle;
      const carroNovo = { name, vehicleType, chassi, year, color };
      console.log(name, vehicleType, chassi, year, color);
      this.vehicleService.save(this.vehicle).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "Veículo salvo com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/carros'], { state: { carroNovo } });
          this.retorno.emit(this.vehicle);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    }


  }
}
