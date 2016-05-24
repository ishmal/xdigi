import {Component,ViewChild} from '@angular/core';
import {Slides,IONIC_DIRECTIVES} from 'ionic-angular';
import {DigiService} from '../../services/DigiService';
import {Digi} from "../../lib/digi";
import {Mode,Properties} from "../../lib/mode/mode";

@Component({
  selector: 'digi-modes',
  template:`
    <ion-slides class='digi-modes' #modeSlider [options]='mySlideOptions' [didChange]='onModeChanged()'>
      <ion-slide *ngFor='#mode of modes'>
      <form>
        <h1>{{mode.properties.name}}</h1>
        <h3>{{mode.properties.description}}</h3>
        <ion-list>
          <ion-item *ngFor='#ctrl of mode.properties.controls'>
            <label>{{ctrl.name}}</label>
            <div [ngSwitch]='ctrl.type'>
              <input type='checkbox' *ngSwitchWhen="'boolean'" [(ngModel)]='ctrl.value' class='form-control'/>
              <select *ngSwitchWhen="'choice'" [(ngModel)]='ctrl.value' class='form-control'>
                <option *ngFor='#opt of ctrl.options' [value]='opt.value' >{{opt.name}}</option>
              </select>
            </div>
          </ion-item>
        </ion-list>
        </form>
      </ion-slide>
    </ion-slides>
    `,
    styles: [`
      .digi-settings {
      }
    `],
    directives: [IONIC_DIRECTIVES]
})
export class DigiModes {

  @ViewChild('modeSlider') slider: Slides;

  digi: Digi;
  modes: Mode[];
  lastIdx: number;

  mySlideOptions = {
    loop: true,
    pager: true
  };

  constructor(digiService: DigiService) {
    console.log("digisettings");
    this.digi = digiService.getDigi();
    this.modes = this.digi.modes;
    this.lastIdx = -1;
  }

  onModeChanged() {
    if (this.slider && this.slider.getSlider()) {
      let idx = this.slider.getSlider().activeIndex - 1;
      let nrModes = this.digi.modes.length;
      // fix JS's mod : http://stackoverflow.com/a/4467559
      idx = (( idx % nrModes) + nrModes) % nrModes;
      if (idx !== this.lastIdx) {
        let mode = this.digi.modes[idx];
        this.digi.mode = mode; // do the switch
        this.digi.status("Mode changed to: " + mode.properties.name);
        this.lastIdx = idx;
      }
    }
  }

}
