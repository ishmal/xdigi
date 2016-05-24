import {Page} from 'ionic-angular';
import {DigiPanel} from "../../components/digi/DigiPanel";

@Page({
	templateUrl: 'build/pages/page1/page1.html',
	directives: [DigiPanel] 
})
export class Page1 {
  constructor() {

  }
}
