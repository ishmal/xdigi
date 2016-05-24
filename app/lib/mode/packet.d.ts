import { FskBase } from './fsk';
declare class Crc {
    _crc: number;
    constructor();
    update(c: any): void;
    value(): number;
    updateLE(c: any): void;
    valueLE(): number;
    reset(): void;
}
declare class PacketMode extends FskBase {
    _state: number;
    _bitcount: number;
    _octet: number;
    _ones: number;
    _bufPtr: number;
    _rxbuf: number[];
    _lastBit: boolean;
    constructor(par: any);
    processBit(inBit: any): void;
    rawPacket(ibytes: any, offset: any, len: any): string;
    processPacket(data: any, len: any): boolean;
}
export { Crc, PacketMode };
