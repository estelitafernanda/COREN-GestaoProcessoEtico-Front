import { Routes } from '@angular/router';
import { CadastroProcessoPage } from './pages/forms/processo/cadastro-processo.page'; 
import { HomePage } from './pages/home/home.page';
import { ProcessoPage } from './pages/processo/processo.page';
import { ProcessoEticoPage } from './pages/processo-etico/processo-etico.page';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'cadastro-processo', component: CadastroProcessoPage},
    {path: 'processo', component: ProcessoPage},
    {path: 'cadastro-processo-etico', },
    {path: 'processo-etico', component: ProcessoEticoPage},

];