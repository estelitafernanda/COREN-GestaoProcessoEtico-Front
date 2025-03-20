import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Processo } from '../../models/processo';
import { CommonModule } from '@angular/common';
import { ProcessoService } from '../../services/processo.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-processo-card',
  templateUrl: './processo-card.component.html',
  imports:[CommonModule, RouterModule],
  styleUrls: ['./processo-card.component.css']
})
export class ProcessoCardComponent {
  @Input() processo!: Processo; 
  @Output() processoDeletado = new EventEmitter<number>(); 

  constructor(private processoService: ProcessoService, private router: Router ) {}


  deletarProcesso() {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você deseja deletar o processo ${this.processo.numberProcess}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.processoService.deletarProcesso(this.processo.processId).subscribe(
          () => {
            Swal.fire('Deletado!', 'O processo foi removido com sucesso.', 'success').then(() => {
              this.router.navigateByUrl('/processo-etico').then(() => {
                window.location.reload();
              });
            });
            this.processoDeletado.emit(this.processo.processId);
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
