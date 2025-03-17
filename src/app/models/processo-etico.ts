import { FasesProcesso } from "./fases-processo";

export interface ProcessoEtico{
    ethicalProcessId: number; 
    responsible: string;
    inspiraEm?: string;
    date: string; 
    numberEthicalProcess: number;
    fasesProcesso: FasesProcesso[];

    get temFases(): boolean;
}