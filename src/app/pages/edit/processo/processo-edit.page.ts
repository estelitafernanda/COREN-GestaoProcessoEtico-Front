import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ProcessoService } from '../../../services/processo.service';

@Component({
  selector: 'app-processo-edit',
  templateUrl: './processo-edit.page.html',
  imports:[FormsModule],
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
    console.log("ID capturado da URL:", id); 

    if (!isNaN(id)) { 
      this.processoService.getProcessoById(id).subscribe(
        (data) => {
          console.log("Processo carregado:", data); 
          this.processo = data;
        },
        (error) => console.error('Erro ao carregar processo', error)
      );
    } else {
      console.error('ID inválido');
      this.router.navigate(['/processo']); 
    }
}

  

    onSubmit(form: NgForm): void {
        if (form.valid) {
            const processoAtualizado = {
                processId: this.processo.processId, 
                numberProcess: this.processo.numberProcess,
                isEthicalProcess: this.processo.isEthicalProcess,
                belongsCofen: this.processo.belongsCofen,
                numberDenuncia: this.processo.numberDenuncia,
                dateDenuncia: this.processo.dateDenuncia
            };

            console.log("Enviando para API:", processoAtualizado); 

            this.processoService.atualizarProcesso(processoAtualizado).subscribe(
                () => {
                    alert('Processo atualizado com sucesso!');
                    this.router.navigate(['/processo']);
                },
                (error) => console.error('Erro ao atualizar processo', error)
            );
        }
    }


}
