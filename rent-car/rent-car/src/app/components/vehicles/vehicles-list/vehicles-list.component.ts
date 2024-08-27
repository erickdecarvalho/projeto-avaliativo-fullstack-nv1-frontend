import { Component } from '@angular/core';
import { Vehicle } from '../../../models/vehicle';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss'
})
export class VehiclesListComponent {
  vehicles: Vehicle[] = [];

  constructor() {
    this.vehicles.push(new Vehicle(1, 'Fiesta', 'CAR', '1212', '2020', 'black', true));
    this.vehicles.push(new Vehicle(1, 'Fiesta', 'CAR', '1212', '2020', 'black', true));
    this.vehicles.push(new Vehicle(1, 'Fiesta', 'CAR', '1212', '2020', 'black', true));
    this.vehicles.push(new Vehicle(1, 'Fiesta', 'CAR', '1212', '2020', 'black', true));
    this.vehicles.push(new Vehicle(1, 'Fiesta', 'CAR', '1212', '2020', 'black', true));
    this.vehicles.push(new Vehicle(1, 'Fiesta', 'CAR', '1212', '2020', 'black', true));
  }

  editar() {

  }

  deletar() {

  }
}
