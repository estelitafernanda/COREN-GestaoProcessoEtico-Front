import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProcessoService {

  private apiUrl = 'http://localhost:8080/api/processo'; 

  constructor() { }

  getProcessos(): Observable<any> {
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
  
}
