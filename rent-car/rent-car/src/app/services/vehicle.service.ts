import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { Page } from '../../page.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  http = inject(HttpClient);

  API = "http://localhost:8080/carros";

  constructor() { }

  findAll(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.API);
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+'/'+id, {responseType: 'text' as 'json'});
  }

  save(vehicle: Vehicle): Observable<string>{
    console.log(vehicle);
    return this.http.post<string>(this.API, vehicle, {responseType: 'text' as 'json'});
  }

  update(vehicle: Vehicle, id: number): Observable<string>{
    return this.http.put<string>(this.API+'/'+id, vehicle, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Vehicle>{
    return this.http.get<Vehicle>(this.API+"/"+id);
  }

  alugar(id: number): Observable<string>{
    return this.http.put<string>(this.API+'/alugar/'+id, {responseType: 'text' as 'json'});
  }

  findFiltered(filters: any, page: number, size: number, sort: string): Observable<Page<Vehicle>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    // Adiciona os parâmetros de filtragem, se fornecidos
    Object.keys(filters).forEach(key => {
      if (filters[key] != null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<Page<Vehicle>>(`${this.API}/filtrar`, { params });
  }
}
