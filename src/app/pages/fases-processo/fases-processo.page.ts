import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FasesProcesso } from "../../models/fases-processo";
import { ProcessoEticoService } from "../../services/processo-etico.service";
import { FasesProcessoCardComponent } from "../../components/fases-processo-card/fases-processo-card.component";

@Component({
    selector: 'app-fases-processo',
    standalone: true,
    imports:[CommonModule, FasesProcessoCardComponent],
    templateUrl: './fases-processo.page.html',
    styleUrl: './fases-processo.page.css',
})

export class FasesProcessoPage implements OnInit {
  ethicalProcessId!: number;
  fases: FasesProcesso[] = [];
  fasesPorPagina: FasesProcesso[] = [];
  paginaAtual: number = 1;
  totalDePaginas: number = 0;
  itensPorPagina: number = 3;

  constructor(
    private route: ActivatedRoute,
    private processoEticoService: ProcessoEticoService,
    private router: Router
  ) {}

  irParaCadastro(): void {
    this.router.navigate([`/cadastro-fases/${this.ethicalProcessId}`]);
  }
  
  ngOnInit(): void {
    this.ethicalProcessId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarFases();
  }

  carregarFases(): void {
    this.processoEticoService.getFasesDoProcesso(this.ethicalProcessId).subscribe(
      (data) => {
        this.fases = Array.isArray(data) ? data : [];
        this.totalDePaginas = Math.ceil(this.fases.length / this.itensPorPagina);
        this.atualizarFasesPorPagina();
      },
      (error) => {
        console.error('Erro ao carregar fases do processo', error);
      }
    );
  }
  atualizarFasesPorPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.fasesPorPagina = this.fases.slice(inicio, Math.min(fim, this.fases.length));
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalDePaginas) {
      this.paginaAtual++;
      this.atualizarFasesPorPagina();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarFasesPorPagina();
    }
  }


  voltar(): void {
    this.router.navigate(['/processo-etico']);
  }
    
}