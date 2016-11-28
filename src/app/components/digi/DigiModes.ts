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
        <select [(ngModel)]="mode" class='digi-mode-select' end>
          <option *ngFor='let mode of modes' [ngValue]='mode'>{{ mode.properties.name }}</option>
        </select>
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
            <label>{{ctrl.name}}</label>
            <select [(ngModel)]='ctrl.value' class='digi-select' end>
              <option *ngFor='let opt of ctrl.options' [ngValue]='opt.value' >{{opt.name}}</option>
            </select>
          </ion-item>
          </div>
        </div>

        </ion-list>
    `,
    styles: [`
      .digi-mode-select {
        float: left;
      }
      .digi-select {
        float: right;
      }
    `]
})
export class DigiModes {

  digi: Digi;
  modes: Mode[];

  constructor(digiService: DigiService) {
    console.log("digisettings");
    this.digi = digiService.getDigiInstance();
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
