// https://leetcode.com/problems/design-parking-system/

class ParkingSystem {
  slots = [0, 0, 0];
  constructor(big: number, medium: number, small: number) {
    this.slots = [big, medium, small];
  }

  addCar(carType: number): boolean {
    return this.slots[carType - 1] > 0
      ? (this.slots[carType - 1]--, true)
      : false;
  }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
