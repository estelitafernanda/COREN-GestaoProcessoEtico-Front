import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../../services/processo.service';
import { Router } from '@angular/router';
import { ProcessoCardComponent } from '../../components/processo-card/processo-card.component';
import { Processo } from '../../models/processo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-processo-list',
  templateUrl: './processo.page.html',
  imports: [CommonModule, ProcessoCardComponent],
  styleUrls: ['./processo.page.css']
})
export class ProcessoPage implements OnInit {
  processos: Processo[] = [];
  processosPorPagina: Processo[] = [];
  paginaAtual: number = 1;
  totalDePaginas: number = 0;
  processosPorPaginaCount: number = 3;

  constructor(private processoService: ProcessoService, private router: Router) {}

  ngOnInit(): void {
    this.processoService.getProcessos().subscribe(
      (data: any) => {
        console.log("Resposta da API antes da limpeza:", data);
  
        this.processos = Array.isArray(data) ? data : [];
  
        this.processos = this.processos.map(processo => ({
          ...processo,
          processoEtico: processo.processoEtico ? { ...processo.processoEtico, processo: undefined } : null
        }));
  
        console.log("Resposta da API após a limpeza:", this.processos);
  
        this.totalDePaginas = Math.ceil(this.processos.length / this.processosPorPaginaCount);
        this.atualizarProcessosPorPagina();
      },
      (error: any) => {
        console.error("Erro ao carregar processos", error);
      }
    );
  }
  removerProcessoDaLista(id: number) {
    this.processos = this.processos.filter(processo => processo.processId !== id);
  }
  

  irParaCadastro(): void {
    this.router.navigate(['/cadastro-processo']);
  }

  atualizarProcessosPorPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.processosPorPaginaCount;
    const fim = inicio + this.processosPorPaginaCount;
    this.processosPorPagina = this.processos.slice(inicio, Math.min(fim, this.processos.length));
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
