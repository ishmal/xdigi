import {Component, ViewChild, Input, AfterViewInit} from '@angular/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic-angular';
import {Toast} from 'ionic-native';
import {DigiService} from '../../services/DigiService';
import {Digi} from "../../lib/digi";
import {Tuner,TunerImpl} from "../../lib/tuner";

@Component({
  selector: 'digi-panel',
  template:`
    <div class='digi-panel'>

      <canvas #tuner class='digi-tuner item' width='800' height='180'></canvas>

      <ion-row class='digi-vcr'>
        <ion-col width-25>
          <button small dark (click)="fastDown()"><ion-icon name="rewind"></ion-icon></button>
        </ion-col>
        <ion-col >
          <button small dark (click)="slowDown()"><ion-icon name="skip-backward"></ion-icon></button>
        </ion-col>
        <ion-col width-25>
          <button small dark (click)="slowUp()"><ion-icon name="skip-forward"></ion-icon></button>
        </ion-col>
        <ion-col width-25>
          <button small dark (click)="fastUp()"><ion-icon name="fastforward"></ion-icon></button>
        </ion-col>

      </ion-row>

      <textarea #terminal class='digi-terminal item'></textarea>
    </div>
    `,
    styles: [`
      .digi-panel {
        height: 100%;
      }
      .digi-tuner {
        height: 180px,
        margin: 0;
        padding: 0;
      }
      .digi-vcr {
        background-color : #333333;
      }
      .digi-status {
        height: 70px;
        overflow-y: scroll;
        resize: none;
        background-color : #d1d1d1;
      }
      .digi-terminal {
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
    `]
})
export class DigiPanel implements AfterViewInit {


  @ViewChild("tuner") tunerAnchor;
  @ViewChild("status") statusAnchor;
  @ViewChild("terminal") terminalAnchor;

  digi: Digi;
  nav: NavController;

  constructor(digiService: DigiService, nav: NavController) {
    console.log("digipanel");
    this.digi = digiService.getDigiInstance();
    this.nav = nav;
    window.addEventListener('resize', (evt) => {
      this.resizeTerminal();
    });
  }

  ngAfterViewInit() {
    console.log("init");
    this.setupTuner();
    this.setupStatus();
    this.setupTerminal();
    this.digi.start();
    this.resizeTerminal();
  }

  setupTuner() {
    let canvas = <HTMLCanvasElement> this.tunerAnchor.nativeElement;
    let tuner: Tuner = new TunerImpl(this.digi, canvas);
    this.digi.tuner = tuner;
  }

  setupStatus() {
    let textWidget = {
        clear : () => {
          //no action
        },
        putText : (str: string) => {
          Toast.show(str, '3000', 'center');
        }
    };
    this.digi.statText = textWidget;
  }

  resizeTerminal() {
    let elem = this.terminalAnchor.nativeElement;
    let rect = elem.getBoundingClientRect();
    let top = rect.top;
    let windowHeight = window.innerHeight;
    let newh = windowHeight - top - 10;
    elem.height = newh;
    elem.style.height = newh.toString() + "px";
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

  fastDown() {
    this.digi.setFrequency(this.digi.frequency - 5);
  }

  slowDown() {
    this.digi.setFrequency(this.digi.frequency - 1);
  }

  slowUp() {
    this.digi.setFrequency(this.digi.frequency + 1);
  }

  fastUp() {
    this.digi.setFrequency(this.digi.frequency + 5);
  }

}
