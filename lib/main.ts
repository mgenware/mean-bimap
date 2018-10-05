export default class BiMap {
  private kvMap: { [k: string]: string|undefined } = {};
  private vkMap: { [k: string]: string|undefined } = {};
  private mLength = 0;

  constructor(pairs?: Array<[string, string]>) {
    if (pairs && pairs.length) {
      for (const p of pairs) {
        this.setPair(p);
      }
    }
  }

  get length(): number {
    return this.mLength;
  }

  keyExists(k: string): boolean {
    return this.kvMap[k] !== undefined;
  }

  valueExists(v: string): boolean {
    return this.vkMap[v] !== undefined;
  }

  set(k: string, v: string): boolean {
    if (this.keyExists(k)) {
      return false;
    }
    this.kvMap[k] = v;
    this.vkMap[v] = k;
    this.mLength++;
    return true;
  }

  setPair([k, v]: [string, string]): boolean {
    return this.set(k, v);
  }

  valueByKey(k: string): string|undefined {
    return this.kvMap[k];
  }

  keyByValue(v: string): string|undefined {
    return this.vkMap[v];
  }

  deleteByKey(k: string): boolean {
    if (!this.keyExists(k)) {
      return false;
    }
    const v = this.valueByKey(k) as string;
    this.deletePair(k, v);
    return true;
  }

  deleteByValue(v: string): boolean {
    if (!this.valueExists(v)) {
      return false;
    }
    const k = this.keyByValue(v) as string;
    this.deletePair(k, v);
    return true;
  }

  keys(): string[] {
    return Object.keys(this.kvMap);
  }

  values(): string[] {
    return Object.keys(this.vkMap);
  }

  invert() {
    const t = this.kvMap;
    this.kvMap = this.vkMap;
    this.vkMap = t;
  }

  private deletePair(k: string, v: string) {
    delete this.kvMap[k];
    delete this.vkMap[v];
    this.mLength--;
  }
}
