import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PaginationModule} from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AlertifyService } from '../../services/AlertifyService';
import { AuthService } from '../../services/authService';
import { MapComponent } from './map/map.component';
import { PropertyComponent } from './Properties/property.component';
import { AddPropertyComponent } from './AddForm/addproperty.component';
import { ListResolver } from '../../_resolvers/list.resolver';
import { appRoutes } from '../../routes';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MapComponent,
    FetchDataComponent,
    PropertyComponent,
    AddPropertyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    PaginationModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'properties', component: PropertyComponent },
      { path: 'addproperty', component: AddPropertyComponent },
    ])
  ],
  providers: [AlertifyService,
    AuthService,
    ListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
