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
import { map, find, tap, filter, mergeMap, switchMap } from 'rxjs/operators';
import { MatDialog, MatStepper } from '@angular/material';
import { DialogRecursoHumanoComponent } from '../../dispendio/recurso-humano/dialog.recurso.humano.component';
import { DialogEquipamentoSoftwareComponent } from '../../dispendio/equipamento-software/dialog.equipamento.software.component';
import { DialogPropriedadeIntelectualComponent } from '../../propriedadeIntelectual/dialog.propriedade.intelectual.component';
import { paths } from '../../app-paths';

const MODULE_CLIENTE = environment.moduleCliente;
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
    console.log(id);
    this.baseService.buscarPorId(MODULE_CLIENTE, id).subscribe(
      onNext => {
        if (onNext && onNext.length > 0) {
          this.entity = onNext[0];
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
