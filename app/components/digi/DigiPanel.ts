import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {DigiService} from '../../services/DigiService';
import {Digi,InText} from "../../lib/digi";
import {Tuner,TunerImpl} from "../../lib/tuner";

@Component({
  selector: 'digi-panel',
  template:`
    <div class='list'>
      <button type='button' class='digi-rxtx item' [ngClass]='{txActive: isOn(), disabled: isDisabled}'
         (click)='toggleRxTx()'>Rx / Tx</button>
      <canvas #tuner class='digi-tuner item' width='800px' height='175px'></canvas>
      <textarea #status class='digi-status item'></textarea>
      <textarea #output class='digi-output item'></textarea>
      <textarea #input class='digi-input item'></textarea>
    </div>
    `,
    styles: [`
      .digi-tuner {
        margin: 0;
        padding: 0;
      }
      .digi-status {
        height: 70px;
        overflow-y: scroll;
        resize: none;
        background-color : #d1d1d1;
      }
      .digi-output {
        height: 120px;
        overflow-y: scroll;
        resize: none;
        background-color : #88aa88;
      }
      .digi-input {
        height: 100px;
        overflow-y: scroll;
        resize: none;
        background-color : #aa8888;
      }
      .digi-rxtx {
        background-color : #88bb88;
        text-align: center;
      }
      .txActive{
        background-color : #bb8888;
      }
    `],
    directives: [CORE_DIRECTIVES]
})
export class DigiPanel implements AfterViewInit {

  @ViewChild("tuner") tunerAnchor;
  @ViewChild("status") statusAnchor;
  @ViewChild("output") outputAnchor;
  @ViewChild("input") inputAnchor;

  digi: Digi;

  constructor(digiService: DigiService) {
    console.log("digipanel");
    this.digi = digiService.getDigi();
  }

  ngAfterViewInit() {
    console.log("init");
    this.setupTuner();
    this.setupStatus();
    this.setupInput();
    this.setupOutput();
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

  setupOutput() {
    let txt = this.outputAnchor.nativeElement;
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
    this.digi.outText = textWidget;
  }

  setupInput() {
    let txt = this.inputAnchor.nativeElement;
    let textWidget = {
        clear : () => {
          txt.value = "";
        },
        getText : ():string => {
          return txt.value
        }
    };
    this.digi.inText = textWidget;
  }

  isOn() {
    return this.digi.txMode;
  }

  toggleRxTx() {
    let rxtx = !this.digi.txMode;
    this.digi.txMode = rxtx;
  }


}
