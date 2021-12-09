export class Duration {
  private readonly ms: number;

  private constructor(ms: number) {
    this.ms = ms;
  }
  static millisecond(n = 1): Duration {
    return new Duration(n * 1);
  }
  static second(n = 1): Duration {
    return new Duration(n * 1000);
  }
  static minute(n = 1): Duration {
    return new Duration(n * 1000 * 60);
  }
  static hour(n = 1): Duration {
    return new Duration(n * 1000 * 60 * 60);
  }
  static day(n = 1): Duration {
    return new Duration(n * 1000 * 60 * 60 * 24);
  }
  static week(n = 1): Duration {
    return new Duration(n * 1000 * 60 * 60 * 24 * 7);
  }
  static year(n = 1): Duration {
    return new Duration(n * 1000 * 60 * 60 * 24 * 365);
  }

  public get milliseconds(): number {
    return this.ms;
  }
  public get seconds(): number {
    return Math.floor(this.ms / 1000);
  }

  public get minutes(): number {
    return Math.floor(this.ms / 1000 / 60);
  }

  public get hours(): number {
    return Math.floor(this.ms / 1000 / 60 / 60);
  }

  public get days(): number {
    return Math.floor(this.ms / 1000 / 60 / 60 / 24);
  }

  public get weeks(): number {
    return Math.floor(this.ms / 1000 / 60 / 60 / 24 / 7);
  }

  public get years(): number {
    return Math.floor(this.ms / 1000 / 60 / 60 / 24 / 365);
  }

  /**
   * Add another duration to this duration and return it
   */
  add(duration: Duration): Duration {
    return new Duration(this.ms + duration.milliseconds);
  }

  /**
   * Subtract another duration from this duration and return it
   */
  sub(duration: Duration): Duration {
    return new Duration(this.ms - duration.milliseconds);
  }
}
