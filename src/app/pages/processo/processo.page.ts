import { Component, OnInit } from '@angular/core';
import { ProcessoService } from '../../services/processo.service';
import { Router } from '@angular/router';
import { ProcessoCardComponent } from '../../components/processo-card/processo-card.component';
import { Processo } from '../../models/processo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process-list',
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
        console.log(data); 
        this.processos = data;
        this.totalDePaginas = Math.ceil(this.processos.length / this.processosPorPaginaCount);
        this.atualizarProcessosPorPagina(); // Atualiza os processos para a primeira página
      },
      (error: any) => {
        console.error("Erro ao carregar processos", error);
      }
    );
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
