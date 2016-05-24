import { FskBase } from './fsk';
export declare class NavtexMode extends FskBase {
    _unshiftOnSpace: boolean;
    _state: number;
    _bitcount: number;
    _code: number;
    _parityBit: boolean;
    _bitMask: number;
    _errs: number;
    _sync1: number;
    _sync2: number;
    _sync3: number;
    _sync4: number;
    _shifted: boolean;
    _dxMode: boolean;
    _q1: number;
    _q2: number;
    _q3: number;
    _lastChar: string;
    constructor(par: any);
    shift7(bit: any): void;
    processBit(bit: any): void;
    qadd(v: any): void;
    processCode(code: any): number;
    processCode2(code: any): string;
}
