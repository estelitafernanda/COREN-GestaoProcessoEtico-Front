import { Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";
import { FasesProcesso } from "../models/fases-processo";

@Injectable({
  providedIn: 'root'
})
export class ProcessoEticoService{

    private apiUrl = 'http://localhost:8080/api/processo-etico';

    constructor(){}

    getProcessosEticos(): Observable<any> {
        return new Observable(observer => {
          axios.get(`${this.apiUrl}`)
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
    getProcessoById(id: number): Observable<any> {
      return new Observable(observer => {
        axios.get(`${this.apiUrl}/${id}`)
          .then(response => {
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.error("Erro ao buscar o processo pelo ID", error);
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
    deletarProcessoEtico(id: number): Observable<any> {
      return new Observable(observer => {
        axios.delete(`${this.apiUrl}/${id}`)
          .then(response => {
            console.log("Processo deletado com sucesso", response.data);
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.error("Erro ao deletar o processo", error);
            observer.error(error);
          });
      });
    }
    findByProcessId(processId: number): Observable<any> {
      return new Observable(observer => {
        axios.get(`${this.apiUrl}/buscar?processId=${processId}`)
          .then(response => {
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.error("Erro ao buscar processo ético pelo processId", error);
            observer.error(error);
          });
      });
    }
    existsByProcessId(processId: number): Observable<boolean> {
      return new Observable(observer => {
        axios.get<boolean>(`${this.apiUrl}/exists/${processId}`)
          .then(response => {
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.error("Erro ao verificar existência do processo ético", error);
            observer.error(error);
          });
      });
    }    
    
    atualizarProcessoEtico(processoEtico: any): Observable<any> {
      return new Observable(observer => {
        axios.put(`${this.apiUrl}/${processoEtico.ethicalProcessId}`, 
          JSON.stringify(processoEtico),  
          {
            headers: {
              'Content-Type': 'application/json'  
            }
          }
        )
        .then(response => {
          console.log("Processo Ético atualizado com sucesso", response.data);
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error("Erro ao atualizar o processo ético", error);
          observer.error(error);
        });
      });
    }
    
    getFasesDoProcesso(ethicalProcessId: number): Observable<FasesProcesso[]> {
      return new Observable(observer => {
        axios.get(`${this.apiUrl}/${ethicalProcessId}/fases`)
          .then(response => {
            observer.next(response.data);
            observer.complete();
          })
          .catch(error => {
            console.error("Erro ao buscar as fases do processo", error);
            observer.error(error);
          });
      });
    }
}