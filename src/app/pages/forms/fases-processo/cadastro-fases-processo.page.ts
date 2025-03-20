import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FasesProcessoService } from "../../../services/fases-processo.service";
import Swal from "sweetalert2";

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
    console.log("ID do processo ético:", this.ethicalProcessId);
  }


  cadastrarFase(): void {
    if (!this.nameFase || !this.prazoFase) {
      Swal.fire({
        title: "Atenção!",
        text: "Preencha todos os campos!",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }
  
    const novaFase = {
      nameFase: this.nameFase,
      prazoFase: this.prazoFase,
      processoEtico: this.ethicalProcessId
    };
  
    console.log("Enviando para API:", JSON.stringify(novaFase, null, 2));
  
    this.fasesProcessoService.cadastrarFase(novaFase).subscribe(
      () => {
        Swal.fire({
          title: "Sucesso!",
          text: "Fase cadastrada com sucesso!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          this.router.navigate([`/processo-etico/${this.ethicalProcessId}/fases`]);
        });
      },
      (error) => {
        console.error("Erro ao cadastrar fase", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível cadastrar a fase. Tente novamente.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }
  
  voltar(): void {
    this.router.navigate([`/processo-etico/${this.ethicalProcessId}/fases`]);
  }
}