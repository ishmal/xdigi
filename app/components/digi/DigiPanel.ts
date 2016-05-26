import {Component, ViewChild, Input, AfterViewInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {DigiService} from '../../services/DigiService';
import {Digi,Terminal} from "../../lib/digi";
import {Tuner,TunerImpl} from "../../lib/tuner";

@Component({
  selector: 'digi-panel',
  template:`
    <div class='list'>

      <ion-row id="buttonbar">
        <ion-col width-15>
          <ion-item [ngClass]='{txActive: rxTx, txInactive: !rxTx}'>
            <ion-label>Rx / Tx</ion-label>
            <ion-toggle  [(ngModel)]='rxTx' disabled='false'></ion-toggle>
          </ion-item>
        </ion-col>
        <ion-col width-15>
          <ion-item>
            <ion-label>AFC</ion-label>
            <ion-toggle [(ngModel)]='useAfc'></ion-toggle>
          </ion-item>
        </ion-col>
        <ion-col width-15>
          <ion-item>
            <ion-label>QRZ</ion-label>
            <ion-toggle [(ngModel)]='useQRZ'></ion-toggle>
          </ion-item>
        </ion-col>
      </ion-row>

      <canvas #tuner class='digi-tuner item' width='800' height='124'></canvas>
      <textarea #status class='digi-status item'></textarea>
      <textarea #terminal class='digi-terminal item'></textarea>
    </div>
    `,
    styles: [`
      .digi-tuner {
        height: 124px,
        margin: 0;
        padding: 0;
      }
      .digi-status {
        height: 70px;
        overflow-y: scroll;
        resize: none;
        background-color : #d1d1d1;
      }
      .digi-terminal {
        height: 160px;
        overflow-y: scroll;
        resize: none;
        background-color : #88aa88;
      }
      .digi-rxtx {
        background-color : #88bb88;
        text-align: center;
      }
      .txActive{
        background-color : #cc0000;
      }
      .txInactive{
        background-color : #00cc00;
      }
    `],
    directives: [CORE_DIRECTIVES, IONIC_DIRECTIVES]
})
export class DigiPanel implements AfterViewInit {


  @ViewChild("tuner") tunerAnchor;
  @ViewChild("status") statusAnchor;
  @ViewChild("terminal") terminalAnchor;

  digi: Digi;

  constructor(digiService: DigiService) {
    console.log("digipanel");
    this.digi = digiService.getDigi();
  }

  ngAfterViewInit() {
    console.log("init");
    this.setupTuner();
    this.setupStatus();
    this.setupTerminal();
    this.digi.start();
  }

  setupTuner() {
    let canvas = <HTMLCanvasElement> this.tunerAnchor.nativeElement;
    let tuner: Tuner = new TunerImpl(this.digi, canvas);
    this.digi.tuner = tuner;
  }

  setupStatus() {
    let txt = this.statusAnchor.nativeElement;
    let textWidget = {
        clear : () => {
          txt.value = "";
        },
        putText : (str: string) => {
          let s = txt.value
          txt.value = s + str;
          txt.scrollTop = txt.scrollHeight;
        }
    };
    this.digi.statText = textWidget;
  }

  setupTerminal() {
    let txt = this.terminalAnchor.nativeElement;
    let textWidget = {
        clear : () => {
          txt.value = "";
        },
        putText : (str: string) => {
          let s = txt.value
          txt.value = s + str;
          txt.scrollTop = txt.scrollHeight;
        },
        getText : ():string => {
          return txt.value
        }
    };
    this.digi.terminal = textWidget;
  }

  get rxTx() {
    return this.digi.txMode;
  }

  @Input()
  set rxTx(val) {
    this.digi.txMode = val;
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
