import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

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
}
