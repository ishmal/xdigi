import {Component} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {DigiService} from '../../services/DigiService';
import {Digi} from "../../lib/digi";

@Component({
  selector: 'digi-settings',
  template:`
    <ion-grid class='digi-settings'>
    </ion-grid>
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

}
