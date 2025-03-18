import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FasesProcessoService } from "../../../services/fases-processo.service";
import { FasesProcesso } from "../../../models/fases-processo";

@Component({
  selector: 'app-cadastro-fases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-fases-processo.page.html',
  styleUrl: './cadastro-fases-processo.page.css',
})
export class CadastroFasesProcessoPage implements OnInit {
  ethicalProcessId!: number;
  nameFase: string = '';
  prazoFase: string = '';

  constructor(
    private route: ActivatedRoute,
    private fasesProcessoService: FasesProcessoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ethicalProcessId = Number(this.route.snapshot.paramMap.get('id'));
  }

  cadastrarFase(): void {
    if (!this.nameFase || !this.prazoFase) {
      alert("Preencha todos os campos!");
      return;
    }
    
    const novaFase = {
      nameFase: this.nameFase,
      prazoFase: this.prazoFase,
      processoEtico: { ethicalProcessId: this.ethicalProcessId }

    };
  
    this.fasesProcessoService.cadastrarFase(novaFase).subscribe(
      () => {
        alert("Fase cadastrada com sucesso!");
        this.router.navigate([`/processo-etico/${this.ethicalProcessId}/fases`]);
      },
      (error) => {
        console.error("Erro ao cadastrar fase", error);
      }
    );
  }
  
  voltar(): void {
    this.router.navigate([`/processo-etico/${this.ethicalProcessId}/fases`]);
  }
}