import {Component,ViewChild,Input} from '@angular/core';
import {Slides,IONIC_DIRECTIVES} from 'ionic-angular';
import {DigiService} from '../../services/DigiService';
import {Digi} from "../../lib/digi";
import {Mode,Properties} from "../../lib/mode/mode";

@Component({
  selector: 'digi-modes',
  template:`
      <ion-list>

        <ion-item>
        <ion-select [(ngModel)]="mode">
          <ion-option *ngFor='let mode of modes' [value]='mode'>{{ mode.properties.name }}</ion-option>
        </ion-select>
        </ion-item>

        <ion-item>
          <h3>{{ mode.properties.description }}</h3>
        </ion-item>

        <div *ngFor='let ctrl of mode.properties.controls'>
          <div [ngSwitch]='ctrl.type'>
          <ion-item *ngSwitchWhen="'boolean'">
            <ion-label>{{ctrl.name}}</ion-label>
            <ion-toggle [(ngModel)]='ctrl.value' class='form-control'></ion-toggle>
          </ion-item>
          <ion-item *ngSwitchWhen="'choice'">
            <ion-label>{{ctrl.name}}</ion-label>
            <ion-select [(ngModel)]='ctrl.value' class='form-control'>
              <ion-option *ngFor='let opt of ctrl.options' [value]='opt.value' >{{opt.name}}</ion-option>
            </ion-select>
          </ion-item>
          </div>
        </div>

        </ion-list>
    `,
    styles: [`
      .digi-settings {
      }
    `],
    directives: [IONIC_DIRECTIVES]
})
export class DigiModes {

  digi: Digi;
  modes: Mode[];

  constructor(digiService: DigiService) {
    console.log("digisettings");
    this.digi = digiService.getDigi();
    this.modes = this.digi.modes;
    this.mode = this.digi.mode;
  }

  get mode() {
    return this.digi.mode;
  }

  @Input()
  set mode(val) {
    this.digi.mode = val;
  }

  onModeChanged() {

  }

}
