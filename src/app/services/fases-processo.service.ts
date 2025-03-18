import { Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";
import { FasesProcesso } from "../models/fases-processo";

@Injectable({
  providedIn: 'root'
})
export class FasesProcessoService {

  private apiUrl = 'http://localhost:8080/api/fases-processo';

  constructor() {}

  getFasesPorProcesso(ethicalProcessId: number): Observable<FasesProcesso[]> {
    return new Observable(observer => {
      axios.get(`${this.apiUrl}/processo-etico/${ethicalProcessId}`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error("Erro ao buscar fases do processo", error);
          observer.error(error);
        });
    });
  }

  cadastrarFase(fase: any ): Observable<any> {
    return new Observable(observer => {
      axios.post(this.apiUrl, fase)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error("Erro ao cadastrar fase", error);
          observer.error(error);
        });
    });
  }

  deletarFase(faseId: number): Observable<any> {
    return new Observable(observer => {
      axios.delete(`${this.apiUrl}/${faseId}`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error("Erro ao deletar fase", error);
          observer.error(error);
        });
    });
  }
  atualizarFase(fase: any): Observable<any> {
    return new Observable(observer => {
      axios.put(`${this.apiUrl}/${fase.fasesId}`, fase)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          console.error("Erro ao atualizar fase", error);
          observer.error(error);
        });
    });
  }
  
}
