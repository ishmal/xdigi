import {Input, Component} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Digi} from "../../lib/digi";
import {DigiService} from '../../services/DigiService';
import {DigiPanel} from "../../components/digi/DigiPanel";
import {DigiModes} from "../../components/digi/DigiModes";
import {DigiSettings} from "../../components/digi/DigiSettings";

@Component({
	templateUrl: 'build/pages/page1/page1.html',
	directives: [DigiPanel, DigiModes, DigiSettings, IONIC_DIRECTIVES]
})
export class Page1 {

	digi: Digi;

  constructor(digiService: DigiService) {
			this.digi = digiService.getDigiInstance();
	}


  get rxTx() {
    return this.digi.txMode;
  }

	toggleRxTx() {
		this.digi.txMode = !this.digi.txMode;
	}

}
