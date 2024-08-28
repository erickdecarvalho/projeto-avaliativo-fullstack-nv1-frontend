import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Vehicle } from '../../../models/vehicle';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { createInjectableType } from '@angular/compiler';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VehiclesDetailsComponent } from "../vehicles-details/vehicles-details.component";
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [RouterLink, MdbModalModule, VehiclesDetailsComponent],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss'
})
export class VehiclesListComponent {
  vehicles: Vehicle[] = [];
  vehicleEdit: Vehicle = new Vehicle(0, "", "", "", "", "", false);

  modalService = inject(MdbModalService);
  @ViewChild('modalVehicleDetalhe') modalVehicleDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  vehicleService = inject(VehicleService);

  constructor() {
    this.findAll();

    let newVehicle = history.state.newVehicle;

    newVehicle.id = 1;
    this.vehicles.push(newVehicle);
  }

  findAll() {
    this.vehicleService.findAll().subscribe({
      next: vehicles => {
        this.vehicles = vehicles;
      },
      error(err) {
        Swal.fire({
          title: 'Ocorreu um erro ao carregar os veículos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  deleteById(vehicle: Vehicle) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if(result.isConfirmed) {
        this.vehicleService.delete(vehicle.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Veículo deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error(err) {
            Swal.fire({
              title: 'Ocorreu um erro ao deletar o veículo',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  new() {
    this.vehicleEdit = new Vehicle(0, "", "", "", "", "", false);
    this.modalRef = this.modalService.open(this.modalVehicleDetalhe);
  }

  edit(vehicle: Vehicle) {
    this.vehicleEdit = Object.assign({}, vehicle);
    this.modalRef = this.modalService.open(this.modalVehicleDetalhe);
  }

  retornoDetalhe(vehicle: Vehicle) {

    if(vehicle.id > 0) {
      let indice = this.vehicles.findIndex( x => {return x.id == vehicle.id});
      this.vehicles[indice] = vehicle;
    } else {
      vehicle.id = 55;
      this.vehicles.push(vehicle);
    }

    this.modalRef.close();
  }
}
