export class Vehicle {
  id!: number;
  name!: string;
  vehicleType!: string;
  chassi!: string;
  year!: string;
  color!: string;
  isRented!: boolean;

  constructor(id: number, name: string, vehicleType: string, chassi: string, year: string, color: string, isRented: boolean){
    this.id = id;
    this.name = name;
    this.vehicleType = vehicleType;
    this.chassi = chassi;
    this.year = year;
    this.color = color;
    this.isRented = isRented;
  };
}
