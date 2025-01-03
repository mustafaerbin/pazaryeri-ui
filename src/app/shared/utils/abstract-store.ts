export abstract class AbstractStore {

  public tableRendered = false;

  public clear() {
    this.set([]);
    this.tableRendered = false;
  }

  public abstract set(sorguSonuclari: any[]);
}
