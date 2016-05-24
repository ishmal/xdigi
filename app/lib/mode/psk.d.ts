import { Mode } from './mode';
import { Filter } from '../filter';
import { Complex } from '../complex';
export interface Timer {
    update(z: Complex, f: (Complex) => void): any;
}
declare class PskMode extends Mode {
    _timer: Timer;
    _bpf: Filter;
    _scopedata: number[][];
    _sctr: number;
    _qpskMode: boolean;
    _code: number;
    _lastv: number;
    _count: number;
    _lastBit: boolean;
    _txBuf: number[];
    _txPtr: number;
    constructor(par: any);
    _setRate(v: any): void;
    bandwidth: number;
    receive(v: any): void;
    scopeOut(z: any): void;
    angleDiff(a: any, b: any): number;
    distance(v: any, from: any): number;
    processSymbol(v: any): void;
    processBit(bit: any): void;
    getNextTransmitBuffer(): number[];
    transmit(): number;
}
declare class PskMode2 extends Mode {
    _ilp: Filter;
    _qlp: Filter;
    _symbollen: number;
    _halfSym: number;
    _lastSign: number;
    _samples: number;
    _scopedata: number[][];
    _sctr: number;
    _ssctr: number;
    _qpskMode: boolean;
    _code: number;
    _lastv: number;
    _count: number;
    _lastBit: boolean;
    _txBuf: number[];
    _txPtr: number;
    constructor(par: any);
    bandwidth: number;
    _setRate(v: number): void;
    receive(z: any): void;
    scopeOut(i: any, q: any): void;
    angleDiff(a: any, b: any): number;
    distance(v: any, from: any): number;
    processSymbol(i: any, q: any): void;
    processBit(bit: any): void;
    getNextTransmitBuffer(): number[];
    transmit(): number;
}
export { PskMode, PskMode2 };
