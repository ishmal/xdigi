import {Component,Input} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {DigiService} from '../../services/DigiService';
import {Digi} from "../../lib/digi";

@Component({
  selector: 'digi-settings',
  template:`
    <ion-list class='digi-settings'>

      <ion-item>
        <ion-label>AFC</ion-label>
        <ion-toggle [(ngModel)]='useAfc'></ion-toggle>
      </ion-item>

      <ion-item>
        <ion-label>QRZ</ion-label>
        <ion-toggle [(ngModel)]='useQRZ'></ion-toggle>
      </ion-item>

      <ion-item>
        <button (click)='doExit()'>Exit</button>
      </ion-item>

    </ion-list>
    `,
    styles: [`
      .digi-settings {
      }
    `],
    directives: [IONIC_DIRECTIVES]
})
export class DigiSettings {

  digi: Digi;

  constructor(digiService: DigiService) {
    console.log("digisettings");
    this.digi = digiService.getDigi();
  }

  get useAfc() {
    return this.digi.useAfc;
  }

  @Input()
  set useAfc(val) {
    this.digi.useAfc = val;
  }

  get useQRZ() {
    return this.digi.useQrz;
  }

  @Input()
  set useQRZ(val) {
    this.digi.useQrz = val;
  }



}
