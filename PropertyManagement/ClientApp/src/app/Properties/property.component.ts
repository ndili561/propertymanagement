import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authService';
import { ActivatedRoute } from '@angular/router';
import { PropertyOwner, PaginatedResult } from '../../../_models/user';
import { AlertifyService } from '../../../services/AlertifyService';

@Component({
  selector: 'app-property-component',
  templateUrl: './property.component.html'
})
export class PropertyComponent {
  paginatedList: PaginatedResult<PropertyOwner[]>;
  userParams: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService,
    private router: ActivatedRoute) { }

  
  ngOnInit() {
    this.router.data.subscribe(data => {
        this.paginatedList = data.paginatedUsersList;
       

      });
      //this.ImportProperties();
    }
    
  

  ImportProperties() {
    this.authService.import(this.paginatedList.pagination.currentPage, this.paginatedList.pagination.itemsPerPage,
      this.userParams)
      .subscribe((paginatedList: PaginatedResult<PropertyOwner[]>) => {
        this.paginatedList = paginatedList;
      }, error => {
        this.alertify.error(error);
      });

  }

  pageChanged(event: any): void {
    this.paginatedList.pagination.currentPage = event.page;
    this.ImportProperties();
  }
  
}
