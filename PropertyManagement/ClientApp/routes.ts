import { Routes } from '@angular/router';
import { HomeComponent } from './src/app/home/home.component';
import { PropertyComponent } from './src/app/Properties/property.component';
import { ListResolver } from './_resolvers/list.resolver';
import { AddPropertyComponent } from './src/app/AddForm/addproperty.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'properties', component: PropertyComponent,
        resolve: { paginatedList: ListResolver }
      },
      {
        path: 'addproperty', component: AddPropertyComponent
       
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
