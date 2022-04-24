import { RepositoryService } from '../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { EmployeeForCreation } from '../../_interface/employeeForCreation.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
 
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  public employeeForm: FormGroup;
  private dialogConfig;
 
  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService) { }
 
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
      data: { }
    }
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.employeeForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createEmployee = (employeeFormValue) => {
    if (this.employeeForm.valid) {
      this.executeEmployeeCreation(employeeFormValue);
    }
  }
 
  private executeEmployeeCreation = (employeeFormValue) => {
    let employee: EmployeeForCreation = {
      sapId: employeeFormValue.sapId,      
      fresherOrLateral: employeeFormValue.fresherOrLateral,
      empName: employeeFormValue.empName,
      projectName: employeeFormValue.projectName,
      band: employeeFormValue.band,
      releaseDate: employeeFormValue.releaseDate,
      delimitationDateInRAS: employeeFormValue.delimitationDateInRAS,
      reasonforRelease: employeeFormValue.reasonforRelease,
      partOfRotation: employeeFormValue.partOfRotation,
      performanceFeedback: employeeFormValue.performanceFeedback,
      noOfMonthsWorked: employeeFormValue.noOfMonthsWorked,
      boardSkil: employeeFormValue.boardSkil,
      skillSet: employeeFormValue.skillSet,
      expInYrs: employeeFormValue.expInYrs,
      contactNumber: employeeFormValue.contactNumber,
      currentLocation: employeeFormValue.currentLocation,
      leavePlan: employeeFormValue.leavePlan,
      releaseRequestor: employeeFormValue.releaseRequestor,
      status: employeeFormValue.status,
    }
 
    let apiUrl = 'employee';
    this.repository.create(apiUrl, employee)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
 
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
      })
    )
  }
 
}