import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FasesProcessoCardComponent } from "../../../components/fases-processo-card/fases-processo-card.component";

@Component({
  selector: 'app-cadastro-fases-processo',
  templateUrl: './cadastro-fases-processo.page.html',
  imports: [CommonModule, FasesProcessoCardComponent],
  styleUrls: ['./cadastro-fases-processo.page.css']
})
export class FasesProcessoPage implements OnInit {
    
    constructor(){}
    ngOnInit(): void {
        
    }
}