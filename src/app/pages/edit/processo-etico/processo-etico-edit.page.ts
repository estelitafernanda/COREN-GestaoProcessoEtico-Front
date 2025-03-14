import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ProcessoEticoService } from "../../../services/processo-etico.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProcessoService } from "../../../services/processo.service";
import { Processo } from "../../../models/processo";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-processo-etico-edit',
  templateUrl:'./processo-etico-edit.page.html',
  imports:[FormsModule, CommonModule],
  styleUrls: ['./processo-etico-edit.page.css']
})
export class ProcessoEticoEditPage implements OnInit{
    processoEtico: any = { processo: { processId: null } };
    processos: Processo[] = [];
    voltarParaLista(): void {
        this.router.navigate(['/processo-etico']);
      }

    constructor(
        private processoEticoService: ProcessoEticoService,
        private router: Router,
        private processoService: ProcessoService,
        private route: ActivatedRoute,
    ){}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        console.log("ID capturado da URL:", id); 
    
        if (!isNaN(id)) { 
          this.processoEticoService.getProcessoById(id).subscribe(
            (data) => {
              console.log("Processo carregado:", data); 
              this.processoEtico = data;
            },
            (error) => console.error('Erro ao carregar processo', error)
          );
        } else {
          console.error('ID inválido');
          this.router.navigate(['/processo']); 
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
            console.error('Erro ao buscar processos', error);
            alert('Erro ao buscar processos. Tente novamente.');
          }
        );
      }
    
    onSubmit(form: NgForm): void {
        if (form.valid) {
            const processoEticoAtualizado = {
                ethicalProcessId: this.processoEtico.ethicalProcessId, 
                numberEthicalProcess: this.processoEtico.numberEthicalProcess,
                responsible: this.processoEtico.responsible,
                date: this.processoEtico.date,
            };

            console.log("Enviando para API:", processoEticoAtualizado); 

            this.processoEticoService.atualizarProcessoEtico(processoEticoAtualizado).subscribe(
                () => {
                    alert('Processo atualizado com sucesso!');
                    this.router.navigate(['/processo-etico']);
                },
                (error) => console.error('Erro ao atualizar processo', error)
            );
        }
    }
}