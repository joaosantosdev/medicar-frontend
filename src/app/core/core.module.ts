import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {LoadingComponent} from './components/loading/loading.component';
import {InputContentComponent} from './components/input-content/input-content.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {DialogControl} from './components/dialog/dialogControl';
import { StatusDialogComponent } from './components/status-dialog/status-dialog.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {UrlHelper} from './helpers/UrlHelper';



@NgModule({
  declarations: [DashboardComponent,LoadingComponent,InputContentComponent,DialogComponent, StatusDialogComponent,PaginationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardComponent,
    LoadingComponent,
    InputContentComponent,
    DialogComponent,
    StatusDialogComponent,
    PaginationComponent

  ],
  providers: [
    UrlHelper
  ]
})
export class CoreModule { }
