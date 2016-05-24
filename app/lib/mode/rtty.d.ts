import { FskBase } from './fsk';
declare class RttyMode extends FskBase {
    _unshiftOnSpace: boolean;
    _symbollen: number;
    _halfsym: number;
    _symarray: boolean[];
    _symptr: number;
    _parityType: number;
    _state: number;
    _bitcount: number;
    _code: number;
    _parityBit: boolean;
    _counter: number;
    _msbit: number;
    _shifted: boolean;
    constructor(par: any);
    setRate(v: any): void;
    static countbits(n: any): number;
    parityOf(c: any): boolean;
    processBit(bit: boolean): void;
    reverse(v: any, size: any): number;
    outCode(rawcode: any): void;
}
export { RttyMode };
