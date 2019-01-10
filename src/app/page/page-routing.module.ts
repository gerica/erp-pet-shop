import { Route } from '@angular/router';
import { FormacaoRoutes } from './formacao/formacao-routing.module';
import { AreaAplicacaoRoutes } from './areaAplicacao/area.aplicacao-routing.module';
import { ProjetoConveniadoRoutes } from './conveniado/conveniado-routing.module';
import { InstituicaoRoutes } from './instituicao/instituicao-routing.module';
import { DashboardRoutes } from './dashboard/dashboard-routing.module';
import { PageComponent } from './page.component';
import { paths } from './app-paths';
import { ClienteRoutes } from './cliente/cliente-routing.module';

export const PageRoutes: Route[] = [
  {
    path: paths.page,
    component: PageComponent,
    children: [
      ...ClienteRoutes,
      ...FormacaoRoutes,
      ...AreaAplicacaoRoutes,
      ...ProjetoConveniadoRoutes,
      ...InstituicaoRoutes,
      ...DashboardRoutes,
    ],
  },
];
