import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessoEticoService } from '../../services/processo-etico.service';
import { ProcessoEtico } from '../../models/processo-etico';
import { ProcessoEticoCardComponent } from '../../components/processo-etico-card/processo-etico-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-processo-etico-list',
  standalone: true,
  imports:[CommonModule, ProcessoEticoCardComponent, FormsModule],
  templateUrl: './processo-etico.page.html',
  styleUrl: './processo-etico.page.css'
})
export class ProcessoEticoPage implements OnInit {
  processosEticos: ProcessoEtico[] = [];
  processosFiltrados: ProcessoEtico[] = [];
  processosPorPagina: ProcessoEtico[] = [];
  termoBusca: string = "";
  paginaAtual: number = 1;
  totalDePaginas: number = 0;
  processosPorPaginaCount: number = 3;

  constructor(private processoService: ProcessoEticoService, private router: Router) {}

  ngOnInit(): void {
    this.processoService.getProcessosEticos().subscribe(
      (data: any) => {
        console.log(data);
        this.processosEticos = Array.isArray(data) ? data : [];
        this.processosFiltrados = [...this.processosEticos]; 
        this.calcularPaginas();
      },
      (error: any) => {
        console.error("Erro ao carregar processos", error);
      }
    );
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro-processo-etico']);
  }

  calcularPaginas(): void {
    this.totalDePaginas = Math.ceil(this.processosFiltrados.length / this.processosPorPaginaCount);
    this.atualizarProcessosPorPagina();
  }

  atualizarProcessosPorPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.processosPorPaginaCount;
    const fim = inicio + this.processosPorPaginaCount;
    this.processosPorPagina = this.processosFiltrados.slice(inicio, Math.min(fim, this.processosFiltrados.length));
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

  filtrarProcessos(): void {
    const termo = this.termoBusca.toLowerCase().trim();
    
    if (!termo) {
      this.processosFiltrados = [...this.processosEticos];
    } else {
      this.processosFiltrados = this.processosEticos.filter((processo) => 
        Object.values(processo).some((valor) =>
          valor && valor.toString().toLowerCase().includes(termo)
        )
      );
    }

    this.paginaAtual = 1;
    this.calcularPaginas();
  }
}
