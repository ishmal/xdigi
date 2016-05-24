import { Digi } from '../digi';
import { Complex } from '../complex';
import { Nco } from '../nco';
import { Filter } from '../filter';
export interface Option {
    name: string;
    value: any;
}
export interface Control {
    name: string;
    type: string;
    tooltip?: string;
    value: any;
    options?: Option[];
}
export interface Properties {
    name: string;
    description: string;
    tooltip: string;
    controls: Control[];
}
export declare class Mode {
    par: Digi;
    _frequency: number;
    _afcFilter: Filter;
    _loBin: number;
    _freqBin: number;
    _hiBin: number;
    _useAfc: boolean;
    _rate: number;
    _nco: Nco;
    _obuf: Float32Array;
    _optr: number;
    _ibuf: number[];
    _ilen: number;
    _iptr: number;
    _properties: Properties;
    constructor(par: Digi);
    properties: Properties;
    frequency: number;
    bandwidth: number;
    adjustAfc(): void;
    useAfc: boolean;
    computeAfc(ps: any): void;
    status(msg: any): void;
    _setRate(v: number): void;
    rate: number;
    samplesPerSymbol: number;
    receiveFft(ps: number[]): void;
    receiveData(v: number): void;
    receive(v: Complex): void;
    getTransmitData(): void;
}
