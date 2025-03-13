import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  private apiUrl = 'http://localhost:8080/api/processo'; 

  constructor() { }

  getProcessos(): Observable<any> {
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

  cadastrarProcesso(processo: any): Observable<any> {
    return new Observable(observer => {
      axios.post(this.apiUrl, processo)
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

  atualizarProcesso(processo: any): Observable<any> {
    return new Observable(observer => {
      axios.put(`${this.apiUrl}/${processo.processId}`, processo)
        .then(response => {
          console.log("Processo atualizado com sucesso", response.data);
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error("Erro ao atualizar o processo", error);
          observer.error(error);
        });
    });
  }

  deletarProcesso(id: number): Observable<any> {
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
}
