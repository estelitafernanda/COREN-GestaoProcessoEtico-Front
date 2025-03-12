import { Routes } from '@angular/router';
import { CadastroProcessoPage } from './pages/forms/processo/cadastro-processo.page'; 
import { HomePage } from './pages/home/home.page';
import { ProcessoPage } from './pages/processo/processo.page';
import { ProcessoEticoPage } from './pages/processo-etico/processo-etico.page';
import { CadastroProcessoEticoPage } from './pages/forms/processo-etico/cadastro-processo-etico.page';
import { FasesProcessoPage } from './pages/fases-processo/fases-processo.page';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'processo', component: ProcessoPage},
    {path: 'cadastro-processo', component: CadastroProcessoPage},
    {path: 'processo-etico', component: ProcessoEticoPage},
    {path: 'cadastro-processo-etico', component: CadastroProcessoEticoPage},
    {path: 'fases-processo', component: FasesProcessoPage}, 
];