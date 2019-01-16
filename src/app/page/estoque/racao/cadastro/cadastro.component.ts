import { BaseService } from 'src/app/page/shared/utils/service/base.service';
import { BaseComponent } from 'src/app/page/base.component';
import { paths } from 'src/app/page/app-paths';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';

import {
  AppMessages,
  MSG001,
  MSG101,
} from 'src/app/page/shared/utils/app.messages';
import { Subscription, Observable, concat, forkJoin, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NgForm, NgModel } from '@angular/forms';
import {
  map,
  find,
  tap,
  filter,
  mergeMap,
  switchMap,
  first,
} from 'rxjs/operators';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from '@angular/material';

const MODULE_CLIENTE = environment.moduleCliente;
const MODULE_ESPECIE = environment.moduleEspecie;
const MODULE_LINHA = environment.moduleLinha;
const MODULE_PORTE = environment.modulePorte;
const MODULE_IDADE_PET = environment.moduleIdadePet;
const URL_PROJETO = `${paths.page}/${paths.cliente}`;

@Component({
  selector: 'app-racao-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent extends BaseComponent
  implements OnInit, OnDestroy {
  private subscription: Subscription;

  activeForm = true;
  entity: any;
  msgObrigatorio = AppMessages.getObj(MSG001);
  especies$: any;
  linha$: any;
  porte$: any;
  idadePet$: any;

  constructor(
    private router: Router,
    private actionRoute: ActivatedRoute,
    private baseService: BaseService,
    public appSnackBarService: AppSnackBarService,
    public dialog: MatDialog,
    private readonly afs: AngularFirestore,
  ) {
    super(appSnackBarService);
  }

  ngOnInit() {
    this.novo();
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.fetchById(params['id']);
      }

      if (environment.isDevelope) {
        this.initForDevelop();
      }
    });
  }

  novo() {
    setTimeout(() => (this.activeForm = true), 0);
    this.activeForm = false;
    this.entity = {};
    this.fetchInfoPage();
  }

  fetchById(id: any): any {
    const sub$ = this.baseService.buscarPorId(MODULE_CLIENTE, id);
    sub$.pipe(first()).subscribe(
      onNext => {
        if (onNext && onNext.length > 0) {
          this.entity = onNext[0];
          this.entity.DTNascimento = onNext[0].DTNascimento.toDate();
        }
      },
      onError => {
        if (onError.error) {
          this.addSnackBar(
            AppMessages.getObjByMsg(onError.error.message, 'Erro'),
          );
        } else {
          this.addSnackBar(AppMessages.getObj(MSG101));
        }
      },
    );
  }

  fetchInfoPage(): void {
    this.especies$ = this.baseService.buscarTodos(MODULE_ESPECIE);
    this.linha$ = this.baseService.buscarTodos(MODULE_LINHA);
    this.porte$ = this.baseService.buscarTodos(MODULE_PORTE);
    this.idadePet$ = this.baseService.buscarTodos(MODULE_IDADE_PET);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  routerConsulta(): void {
    this.router.navigate([URL_PROJETO]);
  }

  gravar(event: any, form: any): void {
    event.preventDefault();
    if (!form.valid) {
      this.addSnackBar(AppMessages.getObj(MSG001));
      return;
    }
    this.baseService
      .salvar(MODULE_CLIENTE, this.entity)
      .then(() => this.routerConsulta());
  }

  initForDevelop() {
    this.entity = {};
  }
}
