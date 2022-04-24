import { RepositoryService } from '../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../_interface/employee.model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  public employeeForm: FormGroup;
  private dialogConfig;
  public employee: Employee;

  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      sapId: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      fresherOrLateral: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      empName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      projectName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      band: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      releaseDate: new FormControl(new Date()),
      delimitationDateInRAS: new FormControl(new Date()),
      reasonforRelease: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      partOfRotation: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      performanceFeedback: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      noOfMonthsWorked: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      boardSkil: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      skillSet: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      expInYrs: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      contactNumber: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      currentLocation: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      leavePlan: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      releaseRequestor: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      status: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    this.getEmployeeById();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  private getEmployeeById = () => {
    let employeeId: string = this.activeRoute.snapshot.params['id'];
      
    let employeeByIdUrl: string = `employee/${employeeId}`;
   
    this.repository.getData(employeeByIdUrl)
      .subscribe(res => {
        this.employee = res as Employee;
        this.employeeForm.patchValue(this.employee);
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  public updateEmployee = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeUpdate(employeeFormValue);
    }
  }

  private executeEmployeeUpdate = (employeeFormValue) => {
 
    this.employee.sapId = employeeFormValue.sapId,      
    this.employee.fresherOrLateral = employeeFormValue.fresherOrLateral,
    this.employee.empName = employeeFormValue.empName,
    this.employee.projectName = employeeFormValue.projectName,
    this.employee.band = employeeFormValue.band,
    this.employee.releaseDate = employeeFormValue.releaseDate,
    this.employee.delimitationDateInRAS = employeeFormValue.delimitationDateInRAS,
    this.employee.reasonforRelease = employeeFormValue.reasonforRelease,
    this.employee.partOfRotation = employeeFormValue.partOfRotation,
    this.employee.performanceFeedback = employeeFormValue.performanceFeedback,
    this.employee.noOfMonthsWorked = employeeFormValue.noOfMonthsWorked,
    this.employee.boardSkil = employeeFormValue.boardSkil,
    this.employee.skillSet = employeeFormValue.skillSet,
    this.employee.expInYrs = employeeFormValue.expInYrs,
    this.employee.contactNumber = employeeFormValue.contactNumber,
    this.employee.currentLocation = employeeFormValue.currentLocation,
    this.employee.leavePlan = employeeFormValue.leavePlan,
    this.employee.releaseRequestor = employeeFormValue.releaseRequestor,
    this.employee.status = employeeFormValue.status
   
    let apiUrl = `employee/${this.employee.sapId}`;
    this.repository.update(apiUrl, this.employee)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
    )
  }

}
