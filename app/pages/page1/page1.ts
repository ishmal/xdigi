import {Input} from '@angular/core';
import {Page} from 'ionic-angular';
import {Digi} from "../../lib/digi";
import {DigiService} from '../../services/DigiService';
import {DigiPanel} from "../../components/digi/DigiPanel";
import {DigiModes} from "../../components/digi/DigiModes";
import {DigiSettings} from "../../components/digi/DigiSettings";

@Page({
	templateUrl: 'build/pages/page1/page1.html',
	directives: [DigiPanel, DigiModes, DigiSettings]
})
export class Page1 {

	digi: Digi;

  constructor(digiService: DigiService) {
			this.digi = digiService.getDigi();
	}


  get rxTx() {
    return this.digi.txMode;
  }

  @Input()
  set rxTx(val) {
    this.digi.txMode = val;
  }


}
