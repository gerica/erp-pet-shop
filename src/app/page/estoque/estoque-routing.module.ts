import { CadastroComponent } from './racao/cadastro/cadastro.component';
import { ListaComponent } from './racao/lista/lista.component';
import { Route } from '@angular/router';
import { paths } from '../app-paths';

export const EstoqueRoutes: Route[] = [
  {
    path: paths.estoque,
    children: [
      {
        path: paths.racao,
        children: [
          {
            path: '',
            component: ListaComponent,
            pathMatch: 'full',
          },
          {
            path: 'cadastro',
            component: CadastroComponent,
          },
          {
            path: 'cadastro/:id',
            component: CadastroComponent,
          },
        ],
      },
    ],
  },
];
