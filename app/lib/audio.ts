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

import {Digi} from './digi';
import {Resampler} from './resample';


export class AudioInput {

    par: Digi;
    sampleRate: number;
    enabled: boolean;

    constructor(par: Digi) {
        this.par = par;
        this.sampleRate = 8000;
        this.enabled = true;
    }
    receive(data: number[]) {
        this.par.receive(data);
    }

    start(): boolean {
        return true;
    }

    stop(): boolean {
        return true;
    }


}

export class AudioOutput {

    par: Digi;
    sampleRate: number;
    enabled: boolean;

    constructor(par: Digi) {
        this.par = par;
        this.sampleRate = 8000;
        this.enabled = true;
    }

    transmit(): number[] {
        return this.par.transmit();
    }

    start(): boolean {
        return true;
    }

    stop(): boolean {
        return true;
    }

}
