import {Page} from 'ionic-angular';
import {DigiPanel} from "../../components/digi/DigiPanel";
import {DigiModes} from "../../components/digi/DigiModes";

@Page({
	templateUrl: 'build/pages/page1/page1.html',
	directives: [DigiPanel, DigiModes]
})
export class Page1 {



  constructor() {
  }

	doExit() {
		//navigator.device.exitApp();
	}
}
