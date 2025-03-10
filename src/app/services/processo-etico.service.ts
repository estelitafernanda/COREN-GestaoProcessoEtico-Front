import { Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProcessoEticoService{

    private apiUrl = 'http://localhost:8080/api/processo-etico';

    constructor(){}

    getProcessosEticos(): Observable<any> {
        return new Observable(observer => {
          axios.get(`${this.apiUrl}/lista`)
            .then(response => {
              observer.next(response.data);
              observer.complete();
            })
            .catch(error => {
              console.error("Erro ao buscar os processos", error);
              observer.error(error);
            });
        });
    }
    cadastrarProcessoEtico(processoEtico: any): Observable<any> {
        return new Observable(observer => {
          axios.post(this.apiUrl, processoEtico)
            .then(response => {
              console.log("Processo cadastrado com sucesso", response.data);  
              observer.next(response.data);
              observer.complete();
            })
            .catch(error => {
              console.error("Erro ao cadastrar o processo", error); 
              observer.error(error);
            });
        });
    }

}