import { Component } from '@angular/core';
import { ProcessoService } from '../../../services/processo.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2';
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
      Swal.fire({
        title: 'Sucesso!',
        text: 'Processo cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/processo']);
      });
    },
    (error) => {
      console.error('Erro ao cadastrar processo', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao cadastrar o processo. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}

  voltar(): void{
    this.router.navigate(['/processo']);
  }
}
