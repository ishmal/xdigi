import { AudioInput, AudioOutput } from './audio';
import { Mode } from './mode/mode';
import { Watcher } from './watch';
import { Tuner } from './tuner';
export interface OutText {
    clear(): void;
    putText(str: string): void;
}
export interface InText {
    clear(): void;
    getText(): string;
}
export declare class Digi {
    _audioInput: AudioInput;
    _audioOutput: AudioOutput;
    _watcher: Watcher;
    _txmode: boolean;
    pskMode: Mode;
    rttyMode: Mode;
    packetMode: Mode;
    navtexMode: Mode;
    _mode: Mode;
    _modes: Mode[];
    _tuner: Tuner;
    _outtext: OutText;
    _intext: InText;
    _stattext: OutText;
    _receive: (data: number) => void;
    constructor(canvas?: HTMLCanvasElement);
    setupReceive(): void;
    receive(data: number): void;
    trace(msg: any): void;
    error(msg: any): void;
    status(str: any): void;
    sampleRate: number;
    mode: Mode;
    modes: Mode[];
    bandwidth: number;
    frequency: number;
    useAfc: boolean;
    useQrz: boolean;
    txMode: boolean;
    tuner: Tuner;
    showScope(data: any): void;
    outText: OutText;
    putText(str: string): void;
    inText: InText;
    statText: OutText;
    getText(): string;
    clear(): void;
    transmit(data: any): void;
    start(): void;
    stop(): void;
}
