// https://leetcode.com/problems/design-underground-system/

class UndergroundSystem {
  customer: Map<number, { station: string; t: number }>;
  avg: Map<string, { sum: number; count: number }>;

  constructor() {
    this.customer = new Map();
    this.avg = new Map();
  }

  checkIn(id: number, station: string, t: number): void {
    this.customer.set(id, { station, t });
  }

  checkOut(id: number, station: string, t: number): void {
    const checkIn = this.customer.get(id);
    if (!checkIn) {
      throw new Error(`Customer ${id} didn't checked in`);
    }
    const key = `${checkIn.station}-${station}`;
    const { sum, count } = this.avg.get(key) ?? { sum: 0, count: 0 };
    this.avg.set(key, { sum: sum + (t - checkIn.t), count: count + 1 });
  }

  getAverageTime(startStation: string, endStation: string): number {
    const { sum, count } = this.avg.get(`${startStation}-${endStation}`) ?? {
      sum: 0,
      count: 0,
    };
    return sum / count;
  }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
