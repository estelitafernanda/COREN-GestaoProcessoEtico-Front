import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FasesProcessoService } from "../../../services/fases-processo.service";
import { FormsModule, NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-fases-processo-edit",
  templateUrl: "./fases-processo-edit.page.html",
  styleUrls: ["./fases-processo-edit.page.css"],
  imports:[FormsModule, CommonModule],
})
export class FasesProcessoEditPage implements OnInit {
  faseProcesso: any = {}; 
  ethicalProcessId!: number; // Armazena o ID do processo ético
  id!: number; // ID da fase atual

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fasesProcessoService: FasesProcessoService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("ID da Fase:", this.id);

    this.fasesProcessoService.getFaseById(this.id).subscribe(
      (data) => {
        console.log("Resposta do backend:", data);
        this.faseProcesso = data;

        // Verifica se `processoEtico` existe antes de acessar `ethicalProcessId`
        if (this.faseProcesso.processoEtico) {
          this.ethicalProcessId = this.faseProcesso.processoEtico.ethicalProcessId;
          console.log("ID do Processo Ético:", this.ethicalProcessId);
        } else {
          console.warn("A fase não está associada a um processo ético!");
          this.ethicalProcessId = 0; // Definir como 0 ou outro valor padrão
        }
      },
      (error) => {
        console.error("Erro ao carregar a fase:", error);
        Swal.fire("Erro", "Não foi possível carregar a fase.", "error");
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
  
    this.fasesProcessoService.atualizarFase(this.faseProcesso).subscribe(
      (response) => {
        console.log("Resposta da atualização:", response);
        
        // Se o processo ético estiver na resposta, pega o ID
        if (response.processoEtico && response.processoEtico.ethicalProcessId) {
          this.ethicalProcessId = response.processoEtico.ethicalProcessId;
        }
  
        Swal.fire("Sucesso!", "Fase atualizada com sucesso.", "success").then(() => {
          this.router.navigate([`/processo-etico/${this.ethicalProcessId}/fases`]); 
        });
      },
      (error) => {
        console.error("Erro ao atualizar a fase:", error);
        Swal.fire("Erro!", "Não foi possível atualizar a fase.", "error");
      }
    );
  }
  
  

  voltarParaLista(): void {
    this.router.navigate([`/processo-etico/${this.ethicalProcessId}/fases`]);
  }
}
