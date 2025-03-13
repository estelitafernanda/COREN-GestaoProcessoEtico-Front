import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ProcessoEticoService } from "../../../services/processo-etico.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-processo-etico-edit',
  templateUrl: './processo-etico-edit.page.html',
  imports:[FormsModule],
  styleUrls: ['./processo-etico-edit.page.css']
})
export class ProcessoEticoEditPage implements OnInit{
    processoEtico: any = {};

    voltarParaLista(): void {
        this.router.navigate(['/processo-etico']);
      }

    constructor(private processoEticoService: ProcessoEticoService, private router: Router){}
    ngOnInit(): void {
        
    }
    onSubmit(form: NgForm): void {
        if (form.valid) {
            const processoEticoAtualizado = {
                ethicalProcessId: this.processoEtico.processId, 
                numberProcess: this.processoEtico.numberProcess,
                isEthicalProcess: this.processoEtico.isEthicalProcess,
                belongsCofen: this.processoEtico.belongsCofen,
                numberDenuncia: this.processoEtico.numberDenuncia,
                dateDenuncia: this.processoEtico.dateDenuncia
            };

            console.log("Enviando para API:", processoEticoAtualizado); 

            this.processoEticoService.atualizarProcessoEtico(processoEticoAtualizado).subscribe(
                () => {
                    alert('Processo atualizado com sucesso!');
                    this.router.navigate(['/processo']);
                },
                (error) => console.error('Erro ao atualizar processo', error)
            );
        }
    }
}