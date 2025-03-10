import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ProcessoEtico } from "../../models/processo-etico";

@Component({
  selector: 'app-processo-etico-card',
  templateUrl: './processo-etico-card.component.html',
  imports:[CommonModule],
  styleUrls: ['./processo-etico-card.component.css']
})
export class ProcessoEticoCardComponent {
  @Input() processoEtico!: ProcessoEtico;  
}