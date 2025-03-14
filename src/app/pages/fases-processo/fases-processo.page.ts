import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-fases-processo',
    standalone: true,
    imports:[CommonModule],
    templateUrl: './fases-processo.page.html',
    styleUrl: './fases-processo.page.css',
})

export class FasesProcessoPage implements OnInit {
    
    constructor(private router: Router){}

    ngOnInit(): void {
        
    }
    irParaCadastro(): void {
        this.router.navigate(['/cadastro-fases-processo']);
    }
}