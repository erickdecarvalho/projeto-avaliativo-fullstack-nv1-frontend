import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Vehicle } from '../../../models/vehicle';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VehiclesDetailsComponent } from "../vehicles-details/vehicles-details.component";
import { VehicleService } from '../../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [RouterLink, MdbModalModule, VehiclesDetailsComponent, CommonModule, FormsModule],
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent {
  lista: Vehicle[] = [];
  carroEdit: Vehicle = new Vehicle(0,"", "", "", "", "", false);

  // Elementos da modal
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  // Serviço de veículos
  carroService = inject(VehicleService);
  loginService = inject(LoginService);

  // Variáveis para filtros
  filters: any = {
    name: '',
    vehicleType: '',
    chassi: '',
    year: null,
    color: '',
    isRented: ''
  };

  clearFilters() {
    this.filters = {
      name: '',
      vehicleType: '',
      chassi: '',
      year: null,
      color: '',
      isRented: '', // Volta para o estado inicial
    };

    this.applyFilters();
  }

  // Variáveis de paginação e ordenação
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  sort: string = 'name,asc';

  constructor() {
    this.listFiltered();
  }

  listFiltered() {
    this.carroService.findFiltered(this.filters, this.currentPage, this.pageSize, this.sort).subscribe({
      next: (data) => {
        this.lista = data.content;
        this.totalElements = data.totalElements;
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.listFiltered();
  }

  onSortChange(sortField: string): void {
    this.sort = `${sortField},asc`;
    this.listFiltered();
  }

  applyFilters() {
    this.currentPage = 0;
    this.listFiltered();
  }

  deleteById(carro: Vehicle) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carroService.delete(carro.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Veículo deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listFiltered();
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
    });
  }

  alugar(carro: Vehicle) {
    Swal.fire({
      title: 'Tem certeza que deseja alterar a disponibilidade deste veículo?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carroService.alugar(carro.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Veículo alugado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listFiltered();
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
    });
  }

  new(){
    this.carroEdit = new Vehicle(0,"", "", "", "", "", false);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Vehicle){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Vehicle){
    this.listFiltered();
    this.modalRef.close();
  }
}
