import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { reopen4,open4,close4, upload4, delete4, GeneralrequestComponent } from './generalrequest/generalrequest.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RequeststableComponent } from './requeststable/requeststable.component';
import { UtilService } from './util.service';
import { reopen2,open2,close2,upload2, delete2, CccplusComponent } from './cccplus/cccplus.component';
import { reopen3, open3, close3, upload3, delete3, Medallion4Component } from './medallion4/medallion4.component';
import { reopen1,open1,close1, upload1, delete1,ProcurementComponent } from './procurement/procurement.component';
import { MediaComponent, reopen5,open5,close5} from './media/media.component';
import { ElectedofficialComponent, reopen6,open6,close6,upload6, delete6} from './electedofficial/electedofficial.component';
import { open7,close7,reopen7,upload7, delete7, ReportproblemComponent } from './reportproblem/reportproblem.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { TextMaskModule } from 'angular2-text-mask';
import { FilterPipe } from './filter.pipe';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {RequiredIfDirective} from './RequiredIf.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxMaskModule} from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxPrintModule} from 'ngx-print';
import{MyDatePickerModule} from 'mydatepicker';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AssignComponent,assign } from './assign/assign.component';
import { NgxTinymceModule } from 'ngx-tinymce';

import { MovetoCccplusComponent } from './moveto-cccplus/moveto-cccplus.component';
import { DocumentComponent,upload5, delete5 } from './document/document.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RequeststableComponent,
    GeneralrequestComponent,
    CccplusComponent,
    Medallion4Component,
    ProcurementComponent,
    MediaComponent,
    ElectedofficialComponent,
    ReportproblemComponent,
    FilterPipe,
    AdminpageComponent,
    DisclaimerComponent,
    LoginComponent,
    LogoutComponent,
    RequiredIfDirective,
    open1,close1,reopen1,upload1, delete1, 
    open2,close2,reopen2,upload2, delete2,
    open3, close3,reopen3,upload3, delete3, 
    open4,close4,reopen4,upload4, delete4, 
    reopen5,open5,close5,upload5, delete5, 
    reopen6,open6,close6,upload6, delete6,
    open7,close7,reopen7,upload7, delete7, AssignComponent,assign, MovetoCccplusComponent, DocumentComponent,
      ],
  imports: [
    BrowserModule,
    RouterModule,
    NgxSummernoteModule,
    routing,
    FormsModule,
    HttpModule,
    TextMaskModule,
    CoreModule,
    MyDatePickerModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    NgxPrintModule,
    AutocompleteLibModule,
    NgxTinymceModule.forRoot({
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
    }),
  ],
  entryComponents: [open1,close1,reopen1,upload1,delete1,
    open2,close2,reopen2,upload2,delete2,
    open3,close3,reopen3,upload3,delete3,
    open4,close4,reopen4,upload4,delete4,
    reopen5,open5,close5,upload5,delete5,
    reopen6,open6,close6,upload6,delete6,
    open7,close7,reopen7,upload7, delete7,assign],
  providers: [UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
