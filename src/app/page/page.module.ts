import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { FormacaoModule } from './formacao/formacao.module';
import { DeleteDialogComponent } from './shared/utils/modal/delete/delete.dialog.component';
import { AreaAplicacaoModule } from './areaAplicacao/area.aplicacao.module';
import { InstituicaoModule } from './instituicao/instituicao.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './notFound/not.found.component';
import { ClienteModule } from './cliente/cliente.module';

@NgModule({
  declarations: [PageComponent, DeleteDialogComponent, NotFoundComponent],
  entryComponents: [DeleteDialogComponent],
  imports: [
    SharedModule,
    ClienteModule,
    FormacaoModule,
    AreaAplicacaoModule,
    InstituicaoModule,
    DashboardModule,
  ],
  exports: [DeleteDialogComponent],
  providers: [],
})
export class PageModule {}
