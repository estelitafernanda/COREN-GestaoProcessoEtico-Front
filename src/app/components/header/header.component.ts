import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuAberto = true;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }
}
