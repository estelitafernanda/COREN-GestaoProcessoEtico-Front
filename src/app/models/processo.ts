import { ProcessoEtico } from "./processo-etico";

export interface Processo {
    processId: number;
    numberProcess: string;
    numberDenuncia: string;
    dateDenuncia: string; 
    isEthicalProcess: boolean;
    belongsCofen: boolean;
    processoEtico?: ProcessoEtico | null;
    
}