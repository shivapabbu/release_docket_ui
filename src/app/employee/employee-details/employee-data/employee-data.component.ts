import { Employee } from '../../../_interface/employee.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {
  @Input() public employee: Employee;
  public selectOptions = [{name:'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();
 
  constructor(private location: Location) { }
 
  ngOnInit() {
  }
 
  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

  public onCancel = () => {
    this.location.back();
  }
 
}
