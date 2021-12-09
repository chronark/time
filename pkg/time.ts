import { Duration } from './duration.ts';

export class Time {
  /**
   * Milliseconds since unix epoch
   */
  private readonly unixMilli: number;

  private constructor(unixMilli: number) {
    this.unixMilli = unixMilli;
  }

  static now(): Time {
    return Time.unixMilli(Date.now());
  }
  static fromISOString(isoString: string): Time {
    return new Time(new Date(isoString).getTime());
  }
  static unix(s: number): Time {
    return new Time(s * 1000);
  }
  static unixMilli(ms: number): Time {
    return new Time(ms);
  }
  /**
   * Returns a new Time.
   * @param year The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.
   * @param month The month as a number between 1 and 12 (January to December).
   * @param day The day as a number between 1 and 31.
   * @param hours Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour.
   * @param minutes Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes.
   * @param seconds Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds.
   * @param ms A number from 0 to 999 that specifies the milliseconds.
   */
  static new(time: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    ms?: number;
  }): Time {
    return new Time(
      Date.UTC(
        time.year ?? 0,
        (time.month ?? 1) - 1,
        time.day ?? 0,
        time.hour ?? 0,
        time.minute ?? 0,
        time.second ?? 0,
        time.ms ?? 0
      )
    );
  }

  add(duration: Duration): Time {
    return Time.unixMilli(this.unixMilli + duration.milliseconds);
  }
  addDate(years: number, months: number, days: number): Time {
    const t = new Date(this.unixMilli);
    return Time.unixMilli(
      Date.UTC(
        t.getUTCFullYear() + years,
        t.getUTCMonth() + months,
        t.getUTCDate() + days,
        t.getUTCHours(),
        t.getUTCMinutes(),
        t.getUTCSeconds(),
        t.getUTCMilliseconds()
      )
    );
  }
  after(time: Time): boolean {
    return this.unixMilli > time.unixMilli;
  }
  afterOrEqual(time: Time): boolean {
    return this.unixMilli >= time.unixMilli;
  }
  before(time: Time): boolean {
    return this.unixMilli < time.unixMilli;
  }
  beforeOrEqual(time: Time): boolean {
    return this.unixMilli <= time.unixMilli;
  }

  date(): Date {
    return new Date(this.unixMilli);
  }

  equal(time: Time): boolean {
    return this.unixMilli === time.unixMilli;
  }
  // format(format: string): string {}

  get unix(): number {
    return Math.floor(this.unixMilli / 1000);
  }

  get ms(): number {
    return new Date(this.unixMilli).getUTCMilliseconds();
  }
  get second(): number {
    return new Date(this.unixMilli).getUTCSeconds();
  }
  get minute(): number {
    return new Date(this.unixMilli).getUTCMinutes();
  }
  get hour(): number {
    return new Date(this.unixMilli).getUTCHours();
  }
  get day(): number {
    return new Date(this.unixMilli).getUTCDate();
  }
  /**
   * Returns the calendarweek.
   */
  get week(): number {
    const t = new Date(this.unixMilli);
    t.setHours(0, 0, 0, 0);
    t.setDate(t.getDate() + 3 - ((t.getDay() + 6) % 7));
    const firstWeek = new Date(t.getUTCFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((t.getTime() - firstWeek.getTime()) / 86400000 -
          3 +
          ((firstWeek.getDay() + 6) % 7)) /
          7
      )
    );
  }
  get month(): number {
    return new Date(this.unixMilli).getUTCMonth() + 1;
  }
  get year(): number {
    return new Date(this.unixMilli).getUTCFullYear();
  }
  /**
   * Returns the time formatted as `YYYY-MM-DDTHH:mm:ss.sssZ` (ISO-8601)
   */
  toString(): string {
    return new Date(this.unixMilli).toISOString();
  }
  sub(duration: Duration): Time {
    return Time.unixMilli(this.unixMilli - duration.milliseconds);
  }
  subDate(years: number, months: number, days: number): Time {
    const t = new Date(this.unixMilli);
    return Time.unixMilli(
      Date.UTC(
        t.getUTCFullYear() - years,
        t.getUTCMonth() - months,
        t.getUTCDate() - days,
        t.getUTCHours(),
        t.getUTCMinutes(),
        t.getUTCSeconds(),
        t.getUTCMilliseconds()
      )
    );
  }
}