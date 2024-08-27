import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Vehicle } from '../../../models/vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles-details',
  standalone: true,
  imports: [MdbFormsModule, CommonModule, FormsModule],
  templateUrl: './vehicles-details.component.html',
  styleUrl: './vehicles-details.component.scss'
})
export class VehiclesDetailsComponent {
  vehicle: Vehicle = new Vehicle(0, "dasdsa", "dsdsa", "dsdsa", "dsadsa", "dsdsa", false);

  save() {}
}
