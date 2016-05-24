
import {Injectable} from '@angular/core';
import {Digi} from "../lib/digi"

@Injectable()
export class DigiService {

  _digi: Digi;

  constructor() {
    this._digi = null;
  }

  /**
   * Lazy getter, so that problems don't happen
   * during bootstrap
   */
  getDigi() : Digi {
    if (!this._digi) {
      try {
        this._digi = new Digi();
      } catch(e) {
        console.log(e);
      }
    }
    return this._digi;
  }

}
