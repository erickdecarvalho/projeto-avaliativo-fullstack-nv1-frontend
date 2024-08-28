import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Vehicle } from '../../../models/vehicle';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { createInjectableType } from '@angular/compiler';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VehiclesDetailsComponent } from "../vehicles-details/vehicles-details.component";
import { VehicleService } from '../../../services/vehicle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [RouterLink, MdbModalModule, VehiclesDetailsComponent, CommonModule],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss'
})
export class VehiclesListComponent {
  lista: Vehicle[] = [];
  carroEdit: Vehicle = new Vehicle(0,"", "", "", "", "", false);

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(VehicleService);

  constructor() {
    this.listAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo != null) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == carroEditado.id;
      });
      this.lista[indice] = carroEditado;
    }
  }

  listAll(){

    this.carroService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
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

            this.listAll();
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

            this.listAll();
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
    this.listAll();
    this.modalRef.close();
  }

}
