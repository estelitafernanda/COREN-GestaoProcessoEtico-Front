import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getProcessosExpirando(dias: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/processos-expirando?dias=${dias}`);
  }

  getTotalProcessos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-processos`);
  }

  getTotalProcessosEticos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-processos-eticos`);
  }
}
