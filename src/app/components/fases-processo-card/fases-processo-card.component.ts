import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FasesProcesso } from '../../models/fases-processo';
import { FasesProcessoService } from '../../services/fases-processo.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-fases-processo-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fases-processo-card.component.html',
  styleUrls: ['./fases-processo-card.component.css']
})
export class FasesProcessoCardComponent {
  @Input() fase!: FasesProcesso;
   @Output() processoDeletado = new EventEmitter<number>(); 
  
    constructor(
      private fasesProcessoService: FasesProcessoService,
      private router: Router
    ) {}
  
  
    deletarProcesso() {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Você deseja deletar a fase ${this.fase.nameFase}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fasesProcessoService.deletarFase(this.fase.fasesId).subscribe(
            () => {
              Swal.fire('Deletado!', 'O processo foi removido com sucesso.', 'success').then(() => {
                this.router.navigateByUrl(`/processo-etico/${this.fase.ethicalProcessId}/fases`).then(() => {
                  window.location.reload();
                });
              });
              this.processoDeletado.emit(this.fase.fasesId);
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
