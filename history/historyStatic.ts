import type { HistoryInterface, HistoryLocation, LocationCallback } from "./history";

export class HistoryStatic implements HistoryInterface {
  protected initial: HistoryLocation;

  constructor(initial: HistoryLocation) {
    this.initial = initial;
  }

  get location(): HistoryLocation {
    return this.initial;
  }

  listen(_fn: LocationCallback): () => void {
    return () => { }
  }

  navigate(_uri: string, _replace?: boolean): void { }
}

export const createHistoryStatic = (initial: HistoryLocation) => new HistoryStatic(initial);
