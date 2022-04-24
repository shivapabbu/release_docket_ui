import { Component, OnInit } from '@angular/core';
import { Employee } from '../../_interface/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';
 
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  public employee: Employee;
 
  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
 
  ngOnInit() {
    this.getEmployeeDetails();
  }
 
  private getEmployeeDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `employee/${id}`;
 
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.employee = res as Employee;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}