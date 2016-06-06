/**
 * Jdigi
 *
 * Copyright 2016, Bob Jamison
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/* global window, navigator*/
/* jslint node: true */

'use strict';

import {Digi} from './digi';
import {Resampler} from './resample';
import {AudioInput, AudioOutput} from './audio';

//######################################################################
interface MediaStream {
    //id: string;
    // active: boolean;
}

interface MediaStreamAudioSourceNode extends AudioNode {

}

interface MediaStreamAudioDestinationNode extends AudioNode {
    stream: MediaStream;
}

interface AudioContext {
    new (): AudioContext;
    sampleRate: number;
    //state: string;
    close: () => void;
    createMediaStreamSource: (MediaStream) => MediaStreamAudioSourceNode;
    createMediaStreamDestination: () => any;
    createScriptProcessor: any;
    createBuffer: (channels:number, frames:number, sampleRate: number) => any;
    createBufferSource: () => any;
    destination: any;
    resume: () => void;
    suspend: () => void;
}

interface Window {
    AudioContext: AudioContext;
    webkitAudioContext: AudioContext;
}

declare var window: Window;

//######################################################################
interface ConstrainBooleanParameters {
    //exact?: boolean;
    //ideal?: boolean;
}

interface NumberRange {
    max?: number;
    min?: number;
}

interface ConstrainNumberRange extends NumberRange {
    exact?: number;
    ideal?: number;
}

interface ConstrainStringParameters {
    exact?: string | string[];
    ideal?: string | string[];
}

interface MediaStreamConstraints {
    //video?: boolean | MediaTrackConstraints;
    //audio?: boolean | MediaTrackConstraints;
}

declare module W3C {
    type LongRange = NumberRange;
    type DoubleRange = NumberRange;
    type ConstrainBoolean = boolean | ConstrainBooleanParameters;
    type ConstrainNumber = number | ConstrainNumberRange;
    type ConstrainLong = ConstrainNumber;
    type ConstrainDouble = ConstrainNumber;
    type ConstrainString = string | string[] | ConstrainStringParameters;
}

interface MediaTrackConstraints extends MediaTrackConstraintSet {
    //advanced?: MediaTrackConstraintSet[];
}

interface MediaTrackConstraintSet {
    //width?: W3C.ConstrainLong;
    //height?: W3C.ConstrainLong;
    //aspectRatio?: W3C.ConstrainDouble;
    //frameRate?: W3C.ConstrainDouble;
    //facingMode?: W3C.ConstrainString;
    //volume?: W3C.ConstrainDouble;
    //sampleRate?: W3C.ConstrainLong;
    //sampleSize?: W3C.ConstrainLong;
    echoCancellation?: W3C.ConstrainBoolean;
    latency?: W3C.ConstrainDouble;
    //deviceId?: W3C.ConstrainString;
    //groupId?: W3C.ConstrainString;
}

interface MediaTrackSupportedConstraints {
    //width?: boolean;
    //height?: boolean;
    //aspectRatio?: boolean;
    //frameRate?: boolean;
    //facingMode?: boolean;
    //volume?: boolean;
    //sampleRate?: boolean;
    //sampleSize?: boolean;
    //echoCancellation?: boolean;
    latency?: boolean;
    //deviceId?: boolean;
    //groupId?: boolean;
}

interface MediaStream extends EventTarget {
    //BOB id: string;
    //BOB active: boolean;

    //onactive: EventListener;
    //oninactive: EventListener;
    //onaddtrack: (event: MediaStreamTrackEvent) => any;
    //onremovetrack: (event: MediaStreamTrackEvent) => any;

    clone(): MediaStream;
    stop(): void;

    getAudioTracks(): MediaStreamTrack[];
    getVideoTracks(): MediaStreamTrack[];
    getTracks(): MediaStreamTrack[];

    getTrackById(trackId: string): MediaStreamTrack;

    addTrack(track: MediaStreamTrack): void;
    removeTrack(track: MediaStreamTrack): void;
}

interface MediaStreamTrackEvent extends Event {
    //track: MediaStreamTrack;
}

declare enum MediaStreamTrackState {
    "live",
    "ended"
}

interface MediaStreamTrack extends EventTarget {
    //id: string;
    //kind: string;
    //label: string;
    //enabled: boolean;
    //muted: boolean;
    //remote: boolean;
    //readyState: MediaStreamTrackState;

    //onmute: EventListener;
    //onunmute: EventListener;
    //onended: EventListener;
    //onoverconstrained: EventListener;

    clone(): MediaStreamTrack;

    stop(): void;

    getCapabilities(): MediaTrackCapabilities;
    getConstraints(): MediaTrackConstraints;
    getSettings(): MediaTrackSettings;
    applyConstraints(constraints: MediaTrackConstraints): Promise<void>;
}

interface MediaTrackCapabilities {
    //width: number | W3C.LongRange;
    //height: number | W3C.LongRange;
    //aspectRatio: number | W3C.DoubleRange;
    //frameRate: number | W3C.DoubleRange;
    //facingMode: string;
    //volume: number | W3C.DoubleRange;
    //sampleRate: number | W3C.LongRange;
    //sampleSize: number | W3C.LongRange;
    //echoCancellation: boolean[];
    latency: number | W3C.DoubleRange;
    //deviceId: string;
    //groupId: string;
}

interface MediaTrackSettings {
    //width: number;
    //height: number;
    //aspectRatio: number;
    //frameRate: number;
    //facingMode: string;
    //volume: number;
    //sampleRate: number;
    //sampleSize: number;
    //echoCancellation: boolean;
    latency: number;
    //deviceId: string;
    //groupId: string;
}

interface MediaStreamError {
    name: string;
    message: string;
    //constraintName: string;
}

interface NavigatorGetUserMedia {
    (constraints: MediaStreamConstraints,
        successCallback: (stream: MediaStream) => void,
        errorCallback: (error: MediaStreamError) => void): void;
}

interface Navigator {

    getUserMedia: NavigatorGetUserMedia;

    webkitGetUserMedia: NavigatorGetUserMedia;

    mozGetUserMedia: NavigatorGetUserMedia;

    msGetUserMedia: NavigatorGetUserMedia;

    mediaDevices: MediaDevices;
}
declare var navigator: Navigator;

interface MediaDevices {
    getSupportedConstraints(): MediaTrackSupportedConstraints;

    getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
    enumerateDevices(): Promise<MediaDeviceInfo[]>;
}

interface MediaDeviceInfo {
    //label: string;
    id: string;
    //kind: string;
    facing: string;
}

//######################################################################


const AudioContext: AudioContext = window.AudioContext || window.webkitAudioContext;

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;


export class WebAudioInput extends AudioInput {

    actx: AudioContext;
    decimation: number;
    source: MediaStreamAudioSourceNode;
    stream: MediaStream;
    inputNode: ScriptProcessorNode;

    constructor(par: Digi) {
        super(par);
        this.par = par;
        this.actx = new AudioContext();
        this.decimation = 7;
        this.sampleRate = this.actx.sampleRate / this.decimation;
        this.source = null;
        this.stream = null;
        this.inputNode = null;
        this.enabled = false;
    }

    startStream(newstream: MediaStream) {

        this.stream = newstream;

        /**
         * workaround for a Firefox bug.  Keep a global ref to source to prevent gc.
         * http://goo.gl/LjEjUF2
         * also a chrome bug
         * save source and inputNode in something that lasts for the term of the program
         */
        this.source = this.actx.createMediaStreamSource(newstream);

        let outBufSize = 1024;
        let outPtr = 0;
        let outBuf = new Array(outBufSize);
        let bufferSize = 8192;
        let decimator = Resampler.create(this.decimation);
        this.inputNode = this.actx.createScriptProcessor(bufferSize, 1, 1);
        this.enabled = true;
        this.inputNode.onaudioprocess = (e) => {
            if (!this.enabled) {
                return;
            }
            let input = e.inputBuffer.getChannelData(0);
            let len = input.length;
            let d = decimator;
            for (let i = 0; i < len; i++) {
                let v = d.decimate(input[i]);
                if (v !== null) {
                    outBuf[outPtr++] = v;
                    if (outPtr >= outBufSize) {
                      this.receive(outBuf);
                      outPtr = 0;
                    }
                }
            }
        };

        this.source.connect(this.inputNode);
        this.inputNode.connect(this.actx.destination);


    }

    start() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { audio: true },
                stream => {
                    this.startStream(stream);
                },
                userMediaError => {
                    this.par.error(userMediaError.name + ' : ' + userMediaError.message);
                }
            );
        } else if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => this.startStream(stream))
                .catch(err => {
                    console.log('audioInput: ' + err);
                });
        }
        return true;
    }

    stop() {
        this.enabled = false;
        if (this.inputNode) {
          this.inputNode.disconnect();
        }
        return true;
    }

}

/**
 * Getting this to work with interpolation isn't easy
 */
export class WebAudioOutputx extends AudioOutput {

    actx: AudioContext;
    isRunning: boolean;
    decimation: number;
    source: any;

    constructor(par: Digi) {
        super(par);
        this.actx = new AudioContext();
        this.decimation = 7;
        this.sampleRate = this.actx.sampleRate / this.decimation;
        this.isRunning = false;
        this.enabled = false;
    }


    start() {

        let that = this;
        let olen = 2048;
        let ibuf = [];
        let ilen = 0;
        let iptr = 0;
        this.source = this.actx.createBufferSource();
        let audioBuffer = this.actx.createBuffer(1, olen, this.sampleRate);
        let obuf = audioBuffer.getChannelData(0);

        function reload(e) {
          if (!that.isRunning) {
            return;
          }
          for (let i = 0 ; i < olen ; i++) {
            obuf[i] = ibuf[iptr++];
            if (iptr >= ilen) {
              ibuf = that.par.transmit();
              ilen = ibuf.length;
              iptr = 0;
            }
          }
          that.source = that.actx.createBufferSource();
          that.source.buffer = audioBuffer;
          that.source.connect(that.actx.destination);
          that.source.onended = reload;
          that.source.start();
          that.isRunning = true;
        }//reload

        this.isRunning = true;
        reload(null);
        return true;
    }


    stop() {
        this.isRunning = false;
        if (this.source) {
          this.source.stop();
        }
        return true;
    }


}

/**
 * Getting this to work with interpolation isn't easy
 */
export class WebAudioOutput extends AudioOutput {

    actx: AudioContext;
    isRunning: boolean;
    outputNode: any;

    constructor(par: Digi) {
        super(par);
        this.actx = new AudioContext();
        this.sampleRate = this.actx.sampleRate;
        this.isRunning = false;
        this.enabled = false;
    }

    start() {

        let that = this;
        let bufferSize = 4096;
        let decimation = 7;
        let iptr = 0;
        let ibuf = [];
        let ilen = 0;
        let obuf = new Array(decimation);
        let optr = decimation;
        let resampler = Resampler.create(decimation);
        this.outputNode = this.actx.createScriptProcessor(bufferSize, 0, 1);
        this.outputNode.onaudioprocess = (e) => {
            if (!that.isRunning) {
                return;
            }
            let output = e.outputBuffer.getChannelData(0);
            let len = output.length;
            for (let i = 0; i < len; i++) {
                if (optr >= decimation) {
                    if (iptr >= ilen) {
                      ibuf = this.par.transmit();
                      ilen = ibuf.length;
                      iptr = 0;
                    }
                    let v = ibuf[iptr++] * 0.1;
                    resampler.interpolate(v, obuf);
                    optr = 0;
                }
                output[i] = obuf[optr++];
            }
        };

        this.outputNode.connect(this.actx.destination);
        this.isRunning = true;
        return true;
    }


    stop() {
        this.isRunning = false;
        if (this.outputNode) {
          this.outputNode.disconnect();
        }
        return true;
    }


}
