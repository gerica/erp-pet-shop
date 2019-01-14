import { BaseService } from './../../shared/utils/service/base.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSnackBarService } from 'src/app/page/shared/utils/snackbar/app-snackbar.component';
import { BaseComponent } from '../../base.component';
import {
  AppMessages,
  MSG001,
  MSG101,
} from 'src/app/page/shared/utils/app.messages';
import { Subscription, Observable, concat, forkJoin, of } from 'rxjs';
import { SepinService } from 'src/app/page/shared/utils/service/sepin.service';
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
import { MatDialog, MatStepper } from '@angular/material';
import { DialogRecursoHumanoComponent } from '../../dispendio/recurso-humano/dialog.recurso.humano.component';
import { DialogEquipamentoSoftwareComponent } from '../../dispendio/equipamento-software/dialog.equipamento.software.component';
import { DialogPropriedadeIntelectualComponent } from '../../propriedadeIntelectual/dialog.propriedade.intelectual.component';
import { paths } from '../../app-paths';

const MODULE_CLIENTE = environment.moduleCliente;
const MODULE_ESPECIE = environment.moduleEspecie;
const MODULE_RACA = environment.moduleRaca;
const URL_PROJETO = `${paths.page}/${paths.cliente}`;

@Component({
  selector: 'app-projeto-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent extends BaseComponent
  implements OnInit, OnDestroy {
  private subscription: Subscription;

  activeForm = true;
  entity: any;
  entities: any[];
  msgObrigatorio = AppMessages.getObj(MSG001);
  especies: any;
  racas: any;
  downloadURL: any;

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
    this.entity = {};
    this.subscription = this.actionRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.fetchById(params['id']);
      }

      if (environment.isDevelope) {
        this.initForDevelop();
      }
    });
  }

  fetchById(id: any): any {
    const sub$ = this.baseService.buscarPorId(MODULE_CLIENTE, id);
    sub$.pipe(first()).subscribe(
      onNext => {
        if (onNext && onNext.length > 0) {
          this.entity = onNext[0];
          this.entity.DTNascimento = onNext[0].DTNascimento.toDate();
        }
        // sub$.unsubscribe();
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
      () => {
        const especies$ = this.baseService.buscarTodos(MODULE_ESPECIE);
        especies$.pipe(first()).subscribe(onNext => {
          this.especies = onNext;
        });
      },
    );
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

  onChangeEspecie(event: any): void {
    const temp$ = this.baseService.buscarPorQuery(MODULE_RACA, ref =>
      ref.where('IDEspecie', '==', event.id),
    );

    temp$.pipe(first()).subscribe(onNext => {
      this.racas = onNext;
      this.racas.sort((a, b) => {
        if (a.NRNome > b.NRNome) {
          return 1;
        }
        if (a.NRNome < b.NRNome) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    });
  }

  onChangeRaca(event: any): void {
    this.downloadURL = this.baseService.downloadFile(event.PAFile);
  }

  initForDevelop() {
    this.entity = {};
  }
}
