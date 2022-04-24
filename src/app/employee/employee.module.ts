import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDataComponent } from './employee-details/employee-data/employee-data.component';
import { AccountDataComponent } from './employee-details/account-data/account-data.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';


@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailsComponent, EmployeeDataComponent, AccountDataComponent, EmployeeCreateComponent, EmployeeUpdateComponent, EmployeeDeleteComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EmployeeModule { }
