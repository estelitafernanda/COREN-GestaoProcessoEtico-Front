import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessoEticoService } from '../../services/processo-etico.service';
import { ProcessoEtico } from '../../models/processo-etico';
import { ProcessoEticoCardComponent } from '../../components/processo-etico-card/processo-etico-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-processo-etico',
  standalone: true,
  imports:[CommonModule, ProcessoEticoCardComponent],
  templateUrl: './processo-etico.page.html',
  styleUrl: './processo-etico.page.css'
})
export class ProcessoEticoPage {
  processosEticos: ProcessoEtico[] = [];
  processosPorPagina: ProcessoEtico[] = [];
  paginaAtual: number = 1;
  totalDePaginas: number = 0;
  processosPorPaginaCount: number = 3;
  
    constructor(private processoService: ProcessoEticoService, private router: Router) {}
  
    ngOnInit(): void {
      this.processoService.getProcessosEticos().subscribe(
        (data: any) => {
          console.log(data); 
          this.processosEticos = data;
          this.totalDePaginas = Math.ceil(this.processosEticos.length / this.processosPorPaginaCount);
          this.atualizarProcessosPorPagina(); 
        },
        (error: any) => {
          console.error("Erro ao carregar processos", error);
        }
      );
    }
  
    irParaCadastro(): void {
      this.router.navigate(['/cadastro-processo-etico']);
    }
  
    atualizarProcessosPorPagina(): void {
      const inicio = (this.paginaAtual - 1) * this.processosPorPaginaCount;
      const fim = inicio + this.processosPorPaginaCount;
      this.processosPorPagina = this.processosEticos.slice(inicio, Math.min(fim, this.processosEticos.length));
    }
  
    proximaPagina(): void {
      if (this.paginaAtual < this.totalDePaginas) {
        this.paginaAtual++;
        this.atualizarProcessosPorPagina();
      }
    }
  
    paginaAnterior(): void {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
        this.atualizarProcessosPorPagina();
      }
    }
  
    irParaPagina(pagina: number): void {
      this.paginaAtual = pagina;
      this.atualizarProcessosPorPagina();
    }
  }
