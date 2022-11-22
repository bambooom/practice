export class Clock {
  private _hour: number;
  private _minute: number;
  constructor(hour: number, minute?: number) {
    this._hour = (hour % 24) + (hour % 24 < 0 ? 24 : 0);
    this._minute = 0;
    if (minute) {
      if (minute > 0) {
        this.plus(minute);
      } else if (minute < 0) {
        this.minus(-minute);
      }
    }
  }

  public toString(): string {
    const h = this._hour;
    const m = this._minute;
    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
  }

  public plus(minutes: number): Clock {
    const sum = this._minute + minutes;
    if (sum < 60) {
      this._minute = sum;
    } else {
      const remain = sum % 60;
      this._minute = remain;
      const hr = this._hour + (sum - remain) / 60;
      this._hour = hr % 24;
    }
    return this;
  }

  public minus(minutes: number): Clock {
    const subtract = this._minute - minutes;
    if (subtract >= 0 && subtract < 60) {
      this._minute = subtract;
    } else if (subtract >= 60) {
      const remain = subtract % 60;
      this._minute = remain;
      const hr = this._hour + (subtract - remain) / 60;
      this._hour = hr % 24;
    } else {
      // sub < 0
      const remain = subtract % 60;
      this._minute = remain + 60;
      const hr = this._hour + (subtract - remain) / 60 - 1;
      this._hour = (hr % 24) + (hr % 24 < 0 ? 24 : 0);
    }
    return this;
  }

  public equals(other: Clock): boolean {
    return this.toString() === other.toString();
  }
}

// ==========================================
// clever solution, using minutes in one day
const MINUTES_IN_DAY = 24 * 60;

export class Clock2 {
  private time = 0;

  constructor(hour = 0, minute = 0) {
    const time = (hour * 60 + minute) % MINUTES_IN_DAY;
    this.time = time < 0 ? time + MINUTES_IN_DAY : time;
  }
  public toString(): string {
    return `${String(Math.trunc(this.time / 60)).padStart(2, '0')}:${String(
      this.time % 60,
    ).padStart(2, '0')}`;
  }
  public plus(minutes: number): Clock2 {
    return new Clock2(0, this.time + minutes);
  }
  public minus(minutes: number): Clock2 {
    return new Clock2(0, this.time - minutes);
  }
  public equals(other: Clock2): boolean {
    return other.time === this.time;
  }
}
