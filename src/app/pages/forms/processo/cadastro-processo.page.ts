import { Component } from '@angular/core';
import { ProcessoService } from '../../../services/processo.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-cadastro-processo',
  templateUrl: './cadastro-processo.page.html',
  imports:[FormsModule],
  styleUrls: ['./cadastro-processo.page.css']
})
export class CadastroProcessoPage {
  processo = {
    numberProcess: '',
    numberDenuncia: '',
    dateDenuncia: '',
    isEthicalProcess: false,
    belongsCofen: false
  };

  constructor(private processoService: ProcessoService, private router: Router) {}

  onSubmit() {
    console.log('Processo a ser enviado: ', this.processo);  
    this.processoService.cadastrarProcesso(this.processo).subscribe(
      (data) => {
        console.log('Resposta do servidor: ', data);  
        alert('Processo cadastrado com sucesso!');
        this.router.navigate(['/processo']);
      },
      (error) => {
        console.error('Erro ao cadastrar processo', error);
        alert('Erro ao cadastrar o processo. Tente novamente.');
      }
    );
  }
  voltar(): void{
    this.router.navigate(['/processo']);
  }
}
