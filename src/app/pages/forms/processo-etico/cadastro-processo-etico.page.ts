import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProcessoEticoService } from "../../../services/processo-etico.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cadastro-processo-etico',
  templateUrl: './cadastro-processo-etico.page.html',
  imports:[FormsModule],
  styleUrls: ['./cadastro-processo-etico.page.css']
})
export class CadastroProcessoEticoPage {
    processoetico = {


    }

    constructor(private processoEticoService: ProcessoEticoService, private router: Router){}
}