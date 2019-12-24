import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService';
import { ActivatedRoute } from '@angular/router';
import { PropertyOwner } from '../../../_models/user';
import { AlertifyService } from '../../../services/AlertifyService';
import { PaginatedResult } from '../../../_models/pagination';

@Component({
  selector: 'app-property-component',
  templateUrl: './property.component.html'
})
export class PropertyComponent {
  paginatedList: PaginatedResult<PropertyOwner[]>;
  userParams: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService,
    private router: ActivatedRoute, private router2: Router) { }

  
  ngOnInit() {
    this.router.data.subscribe(data => {
        this.paginatedList = data.paginatedList;
      });
      this.ImportProperties();
    }
    
  

  ImportProperties() {
    this.authService.import(this.paginatedList.pagination.currentPage, this.paginatedList.pagination.itemsPerPage,
      this.userParams)
      .subscribe((paginatedList: PaginatedResult<PropertyOwner[]>) => {
        console.log(paginatedList)
        this.paginatedList = paginatedList;
      }, error => {
        this.alertify.error(error);
      });

  }

  toAddProperty() {
    this.router2.navigate(['/addproperty']);
  }

  pageChanged(event: any): void {
    this.paginatedList.pagination.currentPage = event.page;
    this.ImportProperties();
  }
  
}
