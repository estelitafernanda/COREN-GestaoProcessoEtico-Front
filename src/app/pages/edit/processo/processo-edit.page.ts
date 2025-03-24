import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ProcessoService } from '../../../services/processo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-processo-edit',
  templateUrl: './processo-edit.page.html',
  imports: [FormsModule],
  styleUrls: ['./processo-edit.page.css']
})
export class ProcessoEditPage implements OnInit {
  processo: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private processoService: ProcessoService
  ) {}

  voltarParaLista(): void {
    this.router.navigate(['/processo']);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID capturado da URL:', id);

    if (!isNaN(id)) {
      this.processoService.getProcessoById(id).subscribe(
        (data) => {
          console.log('Processo carregado:', data);
          this.processo = data;
        },
        (error) => {
          console.error('Erro ao carregar processo', error);
          Swal.fire('Erro!', 'Não foi possível carregar o processo.', 'error');
          this.router.navigate(['/processo']);
        }
      );
    } else {
      console.error('ID inválido');
      Swal.fire('Erro!', 'ID do processo inválido.', 'error');
      this.router.navigate(['/processo']);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      Swal.fire('Atenção!', 'Preencha todos os campos obrigatórios corretamente.', 'warning');
      return;
    }

    const processoAtualizado = {
      processId: this.processo.processId,
      numberProcess: this.processo.numberProcess,
      isEthicalProcess: this.processo.isEthicalProcess,
      belongsCofen: this.processo.belongsCofen,
      numberDenuncia: this.processo.numberDenuncia,
      dateDenuncia: this.processo.dateDenuncia
    };

    console.log('Enviando para API:', processoAtualizado);

    this.processoService.atualizarProcesso(processoAtualizado).subscribe(
      () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Processo atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/processo']);
        });
      },
      (error) => {
        console.error('Erro ao atualizar processo', error);
        Swal.fire('Erro!', 'Não foi possível atualizar o processo.', 'error');
      }
    );
  }
}
