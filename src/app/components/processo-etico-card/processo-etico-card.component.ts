import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProcessoEtico } from "../../models/processo-etico";
import Swal from "sweetalert2";
import { ProcessoEticoService } from "../../services/processo-etico.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-processo-etico-card',
  templateUrl: './processo-etico-card.component.html',
  imports:[CommonModule, RouterModule],
  styleUrls: ['./processo-etico-card.component.css']
})
export class ProcessoEticoCardComponent {
  @Input() processoEtico!: ProcessoEtico; 
  @Output() processoDeletado = new EventEmitter<number>(); 
  
  constructor(private ethicalProcessoService: ProcessoEticoService, private router: Router){}

  navegarParaFases() {
    this.router.navigate(['/processo-etico', this.processoEtico.ethicalProcessId, 'fases']);
  }

  get temFases(): boolean {
    return this.processoEtico.fasesProcesso && this.processoEtico.fasesProcesso.length > 0;
  }
  deletarProcesso(event: Event) {
      event.stopPropagation(); 
      Swal.fire({
        title: 'Tem certeza?',
        text: `Você deseja deletar o processo ${this.processoEtico.numberEthicalProcess}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ethicalProcessoService.deletarProcessoEtico(this.processoEtico.ethicalProcessId).subscribe(
            () => {
              Swal.fire('Deletado!', 'O processo foi removido com sucesso.', 'success');
              this.processoDeletado.emit(this.processoEtico.ethicalProcessId);
            },
            error => {
              console.error('Erro ao deletar o processo', error);
              Swal.fire('Erro!', 'Não foi possível deletar o processo.', 'error');
            }
          );
        }
      });
    }
}