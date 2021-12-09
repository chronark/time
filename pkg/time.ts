import { Duration } from "./duration.ts";

export class Time {
  /**
   * Milliseconds since unix epoch
   */
  private readonly unixMilli: number;

  /**
   * Milliseconds since unix epoch
   */
  public constructor(unixMilli: number);
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
  public constructor(time: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    ms?: number;
  });
  public constructor(
    arg:
      | number
      | {
        year?: number;
        month?: number;
        day?: number;
        hour?: number;
        minute?: number;
        second?: number;
        ms?: number;
      },
  ) {
    if (typeof arg === "number") {
      this.unixMilli = arg;
    } else {
      this.unixMilli = Date.UTC(
        arg.year ?? 0,
        (arg.month ?? 1) - 1,
        arg.day ?? 0,
        arg.hour ?? 0,
        arg.minute ?? 0,
        arg.second ?? 0,
        arg.ms ?? 0,
      );
    }
  }

  static now(): Time {
    return new Time(Date.now());
  }
  static fromISOString(isoString: string): Time {
    return new Time(new Date(isoString).getTime());
  }
  static unix(s: number): Time {
    return new Time(s * 1000);
  }

  public add(duration: Duration): Time {
    return new Time(this.unixMilli + duration.milliseconds);
  }
  public addDate(years: number, months: number, days: number): Time {
    const t = new Date(this.unixMilli);
    return new Time(
      Date.UTC(
        t.getUTCFullYear() + years,
        t.getUTCMonth() + months,
        t.getUTCDate() + days,
        t.getUTCHours(),
        t.getUTCMinutes(),
        t.getUTCSeconds(),
        t.getUTCMilliseconds(),
      ),
    );
  }
  public after(time: Time): boolean {
    return this.unixMilli > time.unixMilli;
  }
  public afterOrEqual(time: Time): boolean {
    return this.unixMilli >= time.unixMilli;
  }
  public before(time: Time): boolean {
    return this.unixMilli < time.unixMilli;
  }
  public beforeOrEqual(time: Time): boolean {
    return this.unixMilli <= time.unixMilli;
  }

  public date(): Date {
    return new Date(this.unixMilli);
  }

  public equal(time: Time): boolean {
    return this.unixMilli === time.unixMilli;
  }
  // format(format: string): string {}

  public get unix(): number {
    return Math.floor(this.unixMilli / 1000);
  }

  public get ms(): number {
    return new Date(this.unixMilli).getUTCMilliseconds();
  }
  public get second(): number {
    return new Date(this.unixMilli).getUTCSeconds();
  }
  public get minute(): number {
    return new Date(this.unixMilli).getUTCMinutes();
  }
  public get hour(): number {
    return new Date(this.unixMilli).getUTCHours();
  }
  public get day(): number {
    return new Date(this.unixMilli).getUTCDate();
  }
  /**
   * Returns the calendarweek.
   */
  public get week(): number {
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
          7,
      )
    );
  }
  public get month(): number {
    return new Date(this.unixMilli).getUTCMonth() + 1;
  }
  public get year(): number {
    return new Date(this.unixMilli).getUTCFullYear();
  }
  /**
   * Returns the time formatted as `YYYY-MM-DDTHH:mm:ss.sssZ` (ISO-8601)
   */
  public toString(): string {
    return new Date(this.unixMilli).toISOString();
  }
  public sub(duration: Duration): Time {
    return new Time(this.unixMilli - duration.milliseconds);
  }
  public subDate(years: number, months: number, days: number): Time {
    const t = new Date(this.unixMilli);
    return new Time(
      Date.UTC(
        t.getUTCFullYear() - years,
        t.getUTCMonth() - months,
        t.getUTCDate() - days,
        t.getUTCHours(),
        t.getUTCMinutes(),
        t.getUTCSeconds(),
        t.getUTCMilliseconds(),
      ),
    );
  }
}
