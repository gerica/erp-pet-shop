import { CadastroComponent } from './racao/cadastro/cadastro.component';
import { ListaComponent } from './racao/lista/lista.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListaComponent, CadastroComponent],
  entryComponents: [],
  imports: [SharedModule],
  providers: [],
})
export class EstoqueModule {}
