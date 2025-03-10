import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProcessoEticoService } from "../../../services/processo-etico.service";
import { Router } from "@angular/router";
import { ProcessoService } from "../../../services/processo.service";

@Component({
  selector: 'app-cadastro-processo-etico',
  templateUrl: './cadastro-processo-etico.page.html',
  imports:[FormsModule],
  styleUrls: ['./cadastro-processo-etico.page.css']
})
export class CadastroProcessoEticoPage {
  processoEtico = {
    numberEthicalProcess: null,
    responsible: '',
    date: '',
    inspiraEm: '',
    processo: {
      processoId: null
    }
  };
  processos = [];

  constructor(
    private processoEticoService: ProcessoEticoService,
     private router: Router,
     private processoService: ProcessoService,
  ) {}

  onSubmit() {
    console.log('Processo a ser enviado: ', this.processoEtico);  
    this.processoEticoService.cadastrarProcessoEtico(this.processoEtico).subscribe(
      (data) => {
        console.log('Resposta do servidor: ', data);  
        alert('Processo cadastrado com sucesso!');
        this.router.navigate(['/processo-etico']);  
      },
      (error) => {
        console.error('Erro ao cadastrar processo', error);
        alert('Erro ao cadastrar o processo. Tente novamente.');
      }
    );
  }
  ngOnInit() {
    this.processoService.getProcessos().subscribe(
      (data) => {
        this.processos = data; 
      },
      (error) => {
        console.error('Erro ao buscar processos', error);
        alert('Erro ao buscar processos. Tente novamente.');
      }
    );
  }
}
