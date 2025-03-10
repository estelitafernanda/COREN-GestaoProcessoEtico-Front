import { Component, Input } from '@angular/core';
import { Processo } from '../../models/processo';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-processo-card',
  templateUrl: './processo-card.component.html',
  imports:[CommonModule],
  styleUrls: ['./processo-card.component.css']
})
export class ProcessoCardComponent {
  @Input() processo!: Processo;  
}
