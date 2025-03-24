import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ProcessoEticoService } from "../../../services/processo-etico.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProcessoService } from "../../../services/processo.service";
import { Processo } from "../../../models/processo";
import { CommonModule } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-processo-etico-edit",
  templateUrl: "./processo-etico-edit.page.html",
  imports: [FormsModule, CommonModule],
  styleUrls: ["./processo-etico-edit.page.css"],
})
export class ProcessoEticoEditPage implements OnInit {
  processoEtico: any = { processo: { processId: null } };
  processos: Processo[] = [];

  constructor(
    private processoEticoService: ProcessoEticoService,
    private router: Router,
    private processoService: ProcessoService,
    private route: ActivatedRoute
  ) {}

  voltarParaLista(): void {
    this.router.navigate(["/processo-etico"]);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log("ID capturado da URL:", id);

    if (!isNaN(id)) {
      this.processoEticoService.getProcessoById(id).subscribe(
        (data) => {
          console.log("Processo carregado:", data);

          this.processoEtico = {
            ...data,
            processo: { processId: data.processId },
          };
        },
        (error) => {
          console.error("Erro ao carregar processo", error);
          Swal.fire("Erro!", "Não foi possível carregar o processo ético.", "error");
          this.router.navigate(["/processo-etico"]);
        }
      );
    } else {
      console.error("ID inválido");
      Swal.fire("Erro!", "ID do processo ético inválido.", "error");
      this.router.navigate(["/processo-etico"]);
    }
    this.ngOnInitProcesso();
  }

  ngOnInitProcesso() {
    this.processoService.getProcessos().subscribe(
      (data: Processo[]) => {
        console.log("Processos carregados:", data);
        this.processos = data;
      },
      (error) => {
        console.error("Erro ao buscar processos", error);
        Swal.fire("Erro!", "Não foi possível buscar os processos.", "error");
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      Swal.fire("Atenção!", "Preencha todos os campos corretamente antes de enviar.", "warning");
      return;
    }

    const processoEticoAtualizado = {
      ethicalProcessId: this.processoEtico.ethicalProcessId,
      numberEthicalProcess: this.processoEtico.numberEthicalProcess,
      responsible: this.processoEtico.responsible,
      date: this.processoEtico.date,
      processId: this.processoEtico.processo?.processId,
    };

    console.log("Enviando para API:", JSON.stringify(processoEticoAtualizado));

    this.processoEticoService.atualizarProcessoEtico(processoEticoAtualizado).subscribe(
      () => {
        Swal.fire({
          title: "Sucesso!",
          text: "Processo ético atualizado com sucesso!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          this.router.navigate(["/processo-etico"]);
        });
      },
      (error) => {
        console.error("Erro ao atualizar processo", error);
        Swal.fire("Erro!", "Não foi possível atualizar o processo ético.", "error");
      }
    );
  }
}
