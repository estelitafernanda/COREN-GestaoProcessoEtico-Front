import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FasesProcesso } from "../../models/fases-processo";
import { ProcessoEticoService } from "../../services/processo-etico.service";

@Component({
    selector: 'app-fases-processo',
    standalone: true,
    imports:[CommonModule],
    templateUrl: './fases-processo.page.html',
    styleUrl: './fases-processo.page.css',
})

export class FasesProcessoPage implements OnInit {
  ethicalProcessId!: number;
  fases: FasesProcesso[] = [];

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
        this.fases = data;
      },
      (error) => {
        console.error('Erro ao carregar fases do processo', error);
      }
    );
  }

  voltar(): void {
    this.router.navigate(['/processo-etico']);
  }
    
}