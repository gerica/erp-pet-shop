import { BaseComponent } from 'src/app/page/base.component';
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  Sort,
  MatDialog,
} from '@angular/material';
import {
  DeleteDialogComponent,
  DeleteDialogData,
} from 'src/app/page/shared/utils/modal/delete/delete.dialog.component';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';

import {
  AppMessages,
  MSG100,
  MSG002,
  MSG101,
  AppMessage,
} from 'src/app/page/shared/utils/app.messages';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
import { environment } from 'src/environments/environment';
import { paths } from 'src/app/page/app-paths';
import { BaseService } from 'src/app/page/shared/utils/service/base.service';

const MODULE_CLIENTE = environment.moduleCliente;
const URL_RACAO_CADASTRO = `${paths.page}/${paths.estoque}/${
  paths.racao
}/cadastro`;

@Component({
  selector: 'app-racao-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent extends BaseComponent implements OnInit {
  entity: any;
  idEntity = 'id';
  entities: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'NRNome',
    'DTNascimento',
    'NRTelefone',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() templateRef: TemplateRef<any>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public appSnackBarService: AppSnackBarService,
    public baseService: BaseService,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.entity = {};
    this.recuperarLista();
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
  }

  applyFilter(filterValue: string) {
    this.entities.filter = filterValue.trim().toLowerCase();
  }

  recuperarLista(): void {
    this.baseService.buscarTodos(MODULE_CLIENTE).subscribe(
      onNext => {
        this.montarEntities(onNext);
      },
      onError => this.addSnackBar(AppMessages.getObj(MSG101)),
    );
  }

  incluir(): void {
    this.router.navigate([URL_RACAO_CADASTRO]);
  }

  preEdit(obj: any): void {
    this.router.navigate([URL_RACAO_CADASTRO, obj[this.idEntity]]);
  }

  deleteRow(row: any) {
    const dataDialog: DeleteDialogData = {
      id: row[this.idEntity],
      title: 'Confirma a exclusão?',
      message: `Sigla: ${row.NRSigla}`,
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: dataDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.delete) {
        this.baseService.apagar(MODULE_CLIENTE, row[this.idEntity]);
      }
    });
  }

  private montarEntities(onNext: any) {
    this.entities = new MatTableDataSource<any>(onNext);
    this.entities.paginator = this.paginator;
    this.entities.sort = this.sort;
  }
}
