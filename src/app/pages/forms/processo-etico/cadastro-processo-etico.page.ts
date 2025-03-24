import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProcessoEticoService } from "../../../services/processo-etico.service";
import { Router } from "@angular/router";
import { ProcessoService } from "../../../services/processo.service";
import { CommonModule } from "@angular/common";
import { Processo } from "../../../models/processo";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cadastro-processo-etico',
  templateUrl: './cadastro-processo-etico.page.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./cadastro-processo-etico.page.css']
})
export class CadastroProcessoEticoPage {
  processoEtico = {
    numberEthicalProcess: null,
    responsible: '',
    date: '',
    inspiraEm: '',
    processo: {
      processId: null
    }
  };
  processos: Processo[] = [];

  constructor(
    private processoEticoService: ProcessoEticoService,
    private router: Router,
    private processoService: ProcessoService,
  ) {}

  onSubmit() {
    console.log("Processo a ser enviado: ", this.processoEtico);

    this.processoEticoService.getProcessosEticos().subscribe((processosEticos: any[]) => {
      const existe = processosEticos.some((pe: any) => pe.processo?.processId === this.processoEtico.processo.processId);
    
      if (existe) {
        Swal.fire("Erro", "Já existe um processo ético para esse processo!", "error");
      } else {
        this.processoEticoService.cadastrarProcessoEtico(this.processoEtico).subscribe(
          (data) => {
            console.log("Resposta do servidor: ", data);
            Swal.fire({
              title: "Sucesso!",
              text: "Processo ético cadastrado com sucesso!",
              icon: "success",
              confirmButtonText: "OK"
            }).then(() => {
              this.router.navigate(["/processo-etico"]);
            });
          },
          (error) => {
            console.error("Erro ao cadastrar processo", error);
            Swal.fire({
              title: "Erro!",
              text: "Erro ao cadastrar o processo. Tente novamente.",
              icon: "error",
              confirmButtonText: "OK"
            });
          }
        );
      }
    });    
  }    

  ngOnInit() {
    this.processoService.getProcessos().subscribe(
      (data: Processo[]) => {
        console.log("Processos carregados:", data);
        this.processos = data;
      },
      (error) => {
        console.error('Erro ao buscar processos', error);
        alert('Erro ao buscar processos. Tente novamente.');
      }
    );
  }
}
