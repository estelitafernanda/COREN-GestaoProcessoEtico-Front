import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-fases-processo',
    standalone: true,
    imports:[CommonModule],
    templateUrl: './fases-processo.page.html',
    styleUrl: './fases-processo.page.css',
})

export class FasesProcessoPage implements OnInit {
    
    constructor(){}

    ngOnInit(): void {
        
    }
}