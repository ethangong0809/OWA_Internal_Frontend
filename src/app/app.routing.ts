import { Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GeneralrequestComponent } from './generalrequest/generalrequest.component';
import { HomeComponent } from './home/home.component';
import { CccplusComponent } from './cccplus/cccplus.component';
import { Medallion4Component } from './medallion4/medallion4.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { MediaComponent } from './media/media.component';
import { ElectedofficialComponent } from './electedofficial/electedofficial.component';
import { ReportproblemComponent } from './reportproblem/reportproblem.component';
import { RequeststableComponent } from './requeststable/requeststable.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import{AssignComponent} from './assign/assign.component';

const appRoutes:Routes = [
    { path: '', redirectTo: 'disclaimer', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'requests', component: RequeststableComponent },
    { path:'general', component: GeneralrequestComponent },
    { path: 'cccplus', component: CccplusComponent },
    { path: 'procurement', component: ProcurementComponent },
    { path: 'med4', component: Medallion4Component },
    { path: 'media', component: MediaComponent },
    { path: 'electedofficial', component: ElectedofficialComponent },
    { path: 'reportproblem', component: ReportproblemComponent },
    { path: 'admin', component: AdminpageComponent },
    { path: 'disclaimer', component: DisclaimerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }

    
];
export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
