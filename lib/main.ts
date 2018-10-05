export default class BiMap {
  private _kvMap: { [k: string]: string } = {};
  private _vkMap: { [k: string]: string } = {};
  private _length = 0;

  constructor(pairs?: Array<[string, string]>) {
    if (pairs && pairs.length) {
      for (const p of pairs) {
        this.setPair(p);
      }
    }
  }

  get length(): number {
    return this._length;
  }

  keyExists(k: string): boolean {
    return this._kvMap[k] !== undefined;
  }

  valueExists(v: string): boolean {
    return this._vkMap[v] !== undefined;
  }

  set(k: string, v: string): boolean {
    if (this.keyExists(k)) {
      return false;
    }
    this._kvMap[k] = v;
    this._vkMap[v] = k;
    this._length++;
    return true;
  }

  setPair([k, v]: [string, string]): boolean {
    return this.set(k, v);
  }

  valueByKey(k: string): string|undefined {
    return this._kvMap[k];
  }

  keyByValue(v: string): string|undefined {
    return this._vkMap[v];
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
    return Object.keys(this._kvMap);
  }

  values(): string[] {
    return Object.keys(this._vkMap);
  }

  invert() {
    const t = this._kvMap;
    this._kvMap = this._vkMap;
    this._vkMap = t;
  }

  private deletePair(k: string, v: string) {
    delete this._kvMap[k];
    delete this._vkMap[v];
    this._length--;
  }
}
