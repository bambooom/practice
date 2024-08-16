// https://leetcode.com/problems/design-parking-system/
// Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.

// Example 1:
// Input
// ["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
// [[1, 1, 0], [1], [2], [3], [1]]
// Output
// [null, true, true, false, false]
// Explanation
// ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
// parkingSystem.addCar(1); // return true because there is 1 available slot for a big car
// parkingSystem.addCar(2); // return true because there is 1 available slot for a medium car
// parkingSystem.addCar(3); // return false because there is no available slot for a small car
// parkingSystem.addCar(1); // return false because there is no available slot for a big car. It is already occupied.

class ParkingSystem {
  slots = [0, 0, 0];
  constructor(big: number, medium: number, small: number) {
    this.slots = [big, medium, small];
  }

  // Checks whether there is a parking space of carType for the car that wants to get into the parking lot.
  // carType can be of three kinds: big, medium, or small, which are represented by 1, 2, and 3 respectively.
  // A car can only park in a parking space of its carType.If there is no space available, return false, else park the car in that size space and return true.
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
