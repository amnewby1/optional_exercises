//PART ONE

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  honk() {
    return "Beep.";
  }
  toString() {
    const { make, model, year } = this;
    return `The vehicle is a ${make} ${model} from ${year}.`;
  }
}

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);

//PART TWO

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

let myFirstCar = new Car("Toyota", "Corolla", 2005);

//PART THREE

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }
  revEngine() {
    return "VROOM!!!";
  }
}

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

//PART FOUR

class Garage {
  constructor(capacity) {
    this.vehicles = [];
    this.capacity = capacity;
  }
  add(newVehicle) {
    if (!(newVehicle instanceof Vehicle)) {
      return "Only vehicles are allowed in here!";
    } else if (this.vehicles.length >= this.capacity) {
      return "Sorry we're full";
    } else {
      this.vehicles.push(newVehicle);
      return "Vehicle added!";
    }
  }
}

let garage = new Garage(2);
